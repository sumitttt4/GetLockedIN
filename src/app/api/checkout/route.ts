import { Checkout } from "@dodopayments/nextjs";

export const POST = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY || process.env.DODO_API_KEY!,
    returnUrl: "https://getlockedin.live/checkout/success",
    environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "live_mode" | "test_mode") || "test_mode",
    type: "session",
});
