"use client";

import { useEffect } from "react";

export default function CheckoutPage() {
    useEffect(() => {
        // Redirect immediately to Dodo Payments checkout
        window.location.href = "https://checkout.dodopayments.com/buy/pdt_0NUvc8v3ozWTrnPigc0ka?quantity=1&redirect_url=https://getlockedin.live/checkout/success";
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin w-8 h-8 border-4 border-zinc-300 border-t-zinc-900 rounded-full mx-auto mb-4"></div>
                <p className="text-zinc-600">Redirecting to checkout...</p>
            </div>
        </div>
    );
}
