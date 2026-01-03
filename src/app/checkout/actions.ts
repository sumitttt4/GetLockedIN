"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Create a DoDo Payment checkout session
 * Documentation: https://docs.dodo.co/api/checkout
 */
export async function createDoDoCheckout() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    // Use the specific Product Link provided
    const PRODUCT_LINK = "https://checkout.dodopayments.com/buy/pdt_0NUvc8v3ozWTrnPigc0ka";

    // Construct return URL (success page)
    const returnUrl = 'https://getlockedin.live/checkout/success';

    // Construct final URL with pre-filled email and redirect
    // Note: DoDo supports 'email' param to pre-fill customer email
    // Fix: Fallback to empty string if email is undefined to satisfy TS
    const checkoutUrl = `${PRODUCT_LINK}?quantity=1&redirect_url=${encodeURIComponent(returnUrl)}&email=${encodeURIComponent(user.email || '')}`;

    return {
        success: true,
        checkoutUrl: checkoutUrl,
        // We return a placeholder session ID since we are using a static link
        // The success page will need to handle the params DoDo sends back
        sessionId: 'link-flow'
    };
}

/**
 * Verify DoDo Payment completion and update user status
 * Called after successful payment redirect or via webhook
 */
export async function verifyDoDoPayment(sessionId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: "Not authenticated" };

    try {
        // Verify the session with DoDo API
        const response = await fetch(`https://api.dodo.co/v1/checkout/sessions/${sessionId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${process.env.DODO_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return { error: 'Failed to verify payment' };
        }

        const session = await response.json();

        // Check if payment is complete
        if (session.status === 'completed' || session.payment_status === 'paid') {
            // Update user profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ has_paid: true })
                .eq('id', user.id);

            if (updateError) {
                return { error: updateError.message };
            }

            // Store the integration record (optional - for tracking)
            await supabase.from('integrations').upsert({
                user_id: user.id,
                type: 'dodo',
                config: {
                    session_id: sessionId,
                    payment_date: new Date().toISOString(),
                    amount: session.amount,
                }
            });

            revalidatePath('/dashboard');
            revalidatePath('/checkout');

            return { success: true };
        } else {
            return { error: 'Payment not completed' };
        }

    } catch (error: any) {
        console.error('Payment Verification Error:', error);
        return { error: error.message || 'Verification failed' };
    }
}

/**
 * DEVELOPMENT ONLY: Simulate payment for testing without API keys
 * Remove this in production
 */
export async function simulatePayment() {
    // Check if we're in development mode AND don't have DoDo keys
    if (process.env.NODE_ENV === 'development' && !process.env.DODO_SECRET_KEY) {
        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return { error: "Not authenticated" };

        // UPDATE PROFILE
        const { error } = await supabase
            .from('profiles')
            .update({ has_paid: true })
            .eq('id', user.id);

        if (error) {
            return { error: error.message };
        }

        revalidatePath('/dashboard');
        revalidatePath('/checkout');

        return { success: true };
    }

    return { error: "Simulation only available in development mode" };
}
