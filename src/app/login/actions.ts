"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function loginWithMagicLink(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get("email") as string;

    // Validate email (basic)
    if (!email || !email.includes("@")) {
        return { error: "Invalid email address" };
    }

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            // Redirect to the callback route which handles the code exchange
            emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    });

    if (error) {
        return { error: error.message };
    }

    return { success: "Magic link sent! Check your email." };
}

export async function loginWithOAuth(provider: 'google' | 'github') {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            // Force redirect to /checkout to ensure payment check
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    });

    if (error) {
        // In server actions, we might handle this differently, but for now redirect or return error
        console.error("OAuth Error:", error);
        redirect("/login?error=oauth_failed");
    }

    if (data.url) {
        redirect(data.url);
    }
}
