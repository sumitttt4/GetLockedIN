"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";

export async function createGoal(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const title = formData.get("title") as string;
    const deadline = formData.get("deadline") as string;

    // Optional / New Fields
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const visibility = formData.get("visibility") as string || 'public';
    const target_value = formData.get("target_value");
    const unit = formData.get("unit") as string || 'USD'; // Default currency

    if (!title || !deadline) {
        return { error: "Missing required fields (Title, Deadline)" };
    }

    const { error } = await supabase.from("goals").insert({
        user_id: user.id,
        title,
        description,
        deadline,
        category,
        visibility,
        target_value: target_value ? Number(target_value) : null,
        current_value: 0,
        unit,
        status: "active",
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: "Protocol Initiated" };
}

export async function getProfile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data, error } = await supabase
        .from("profiles")
        .select("username, display_name, created_at")
        .eq("id", user.id)
        .single();

    if (error) return null;

    return {
        username: data.username,
        display_name: data.display_name,
        joined_at: data.created_at,
        email: user.email
    };
}

export async function getGoals() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching goals", error);
        return [];
    }

    // Format for Frontend
    return data.map(goal => ({
        id: goal.id,
        title: goal.title,
        description: goal.description,
        status: goal.status === 'active' ? 'In Progress' :
            goal.status === 'completed' ? 'Completed' : 'Not Started',
        date: new Date(goal.created_at).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' }),
        progress: goal.target_value ? Math.min(100, Math.round((goal.current_value / goal.target_value) * 100)) : 0,
        currency: goal.unit || 'USD',
        target_value: goal.target_value,
        current_value: goal.current_value,
        category: goal.category,
        visibility: goal.visibility
    }));
}

export async function commitLog(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: "Unauthorized" };
    }

    const content = formData.get("content") as string;

    if (!content) {
        return { error: "Log content empty" };
    }

    const { error } = await supabase.from("ledger").insert({
        user_id: user.id,
        content,
        log_date: new Date().toISOString(),
        status: "shipped",
    });

    if (error) {
        return { error: error.message };
    }

    revalidatePath("/dashboard");
    return { success: "Log Committed" };
}

// --- STRIPE ACTIONS ---

export async function connectStripe(formData: FormData) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { error: "Unauthorized" };

    const apiKey = formData.get("api_key") as string;
    if (!apiKey || !apiKey.startsWith("sk_")) {
        return { error: "Invalid Secret Key (must start with sk_)" };
    }

    // Verify Key
    try {
        const stripe = new Stripe(apiKey);
        await stripe.balance.retrieve(); // Will throw if key is invalid
    } catch (e) {
        return { error: "Invalid Stripe API Key. Connection failed." };
    }

    // Upsert Integration
    // Check if exists first (Supabase upsert based on constraint might be needed, or just delete/insert)
    // Note: We don't have a unique constraint on (user_id, type) in the simple schema yes, 
    // so we'll do a check first.

    // 1. Delete existing
    await supabase.from("integrations").delete().match({ user_id: user.id, type: "stripe" });

    // 2. Insert new
    const { error } = await supabase.from("integrations").insert({
        user_id: user.id,
        type: "stripe",
        config: { api_key: apiKey },
        connected_at: new Date().toISOString()
    });

    if (error) return { error: error.message };

    revalidatePath("/dashboard");
    return { success: "Stripe Connected Successfully" };
}

export async function getStripeData() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    // Fetch config
    const { data } = await supabase
        .from("integrations")
        .select("config")
        .eq("user_id", user.id)
        .eq("type", "stripe")
        .single();

    if (!data || !data.config || !(data.config as any).api_key) {
        return null; // Not connected
    }

    try {
        const apiKey = (data.config as any).api_key;
        const stripe = new Stripe(apiKey);

        // Fetch Balance
        const balance = await stripe.balance.retrieve();
        const available = balance.available.reduce((acc, b) => acc + b.amount, 0);
        const pending = balance.pending.reduce((acc, b) => acc + b.amount, 0);

        // Fetch recent charges (for activity)
        const charges = await stripe.charges.list({ limit: 3 });

        return {
            isConnected: true,
            balance: (available + pending) / 100, // Convert cents to dollars
            currency: balance.available[0]?.currency.toUpperCase() || 'USD',
            recentCharges: charges.data.map(c => ({
                amount: c.amount / 100,
                status: c.status,
                created: c.created
            }))
        };
    } catch (e) {
        console.error("Stripe Fetch Error", e);
        return { error: "Failed to fetch data" };
    }
}
