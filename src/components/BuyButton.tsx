"use client";

import { Button } from "./ui/button";

interface BuyButtonProps {
    productId: string;
    children?: React.ReactNode;
    className?: string;
}

export function BuyButton({ productId, children, className }: BuyButtonProps) {
    const checkoutUrl = `https://checkout.dodopayments.com/buy/${productId}?quantity=1&redirect_url=https://getlockedin.live/checkout/success`;

    return (
        <Button
            className={className}
            onClick={() => window.location.href = checkoutUrl}
        >
            {children || "Buy now"}
        </Button>
    );
}
