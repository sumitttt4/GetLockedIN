"use client";

import { Button } from "./ui/button";

interface BuyButtonProps {
    productId: string;
    children?: React.ReactNode;
    className?: string;
}

export function BuyButton({ productId, children, className }: BuyButtonProps) {
    return (
        <Button
            className={className}
            onClick={async () => {
                try {
                    const res = await fetch("/api/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            product_cart: [
                                { product_id: productId, quantity: 1 },
                            ],
                            return_url: `${window.location.origin}/checkout/success`,
                        }),
                    });

                    const data = await res.json();
                    // Adapter might return url or checkout_url depending on version
                    if (data.checkout_url || data.url) {
                        window.location.href = data.checkout_url || data.url;
                    } else {
                        alert("Failed to initialize checkout");
                    }
                } catch (e) {
                    console.error(e);
                    alert("Error starting checkout");
                }
            }}
        >
            {children || "Buy now"}
        </Button>
    );
}
