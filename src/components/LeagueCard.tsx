"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trophy, Check, Zap, Crown } from "lucide-react";

interface LeagueCardProps {
    className?: string;
}

export function LeagueCard({ className }: LeagueCardProps) {
    const features = [
        "Access to Global Leaderboard",
        "Unlimited AI Protocols",
        "Verified Badge on Profile",
        "Priority Challenge Queue",
        "Exclusive Discord Access",
    ];

    return (
        <div className={cn(
            "relative p-8 overflow-hidden bg-white border border-zinc-200 rounded-xl shadow-sm",
            className
        )}>
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-transparent to-transparent" />

            {/* Badge */}
            <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 text-xs font-mono uppercase tracking-widest mb-6">
                <Crown className="w-3 h-3" />
                Premium League
            </div>

            {/* Title */}
            <div className="relative mb-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2">January Builders League</h3>
                <p className="text-zinc-500 text-sm">
                    Free users play for fun. Pros play for blood.
                </p>
            </div>

            {/* Price */}
            <div className="relative mb-6">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-zinc-900">₹100</span>
                    <span className="text-zinc-500 text-sm">/ month</span>
                </div>
            </div>

            {/* Features */}
            <ul className="relative space-y-2 mb-6">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs">
                        <Check className="w-3 h-3 text-green-600" />
                        <span className="text-zinc-600">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <Button
                className="relative w-full h-12 bg-black hover:bg-zinc-800 text-white font-bold font-mono shadow-md"
            >
                <Zap className="w-4 h-4 mr-2 fill-current" />
                Join League
            </Button>

            {/* Prize Pool */}
            <div className="relative flex items-center justify-center gap-2 mt-4 text-xs font-mono text-zinc-500">
                <Trophy className="w-3 h-3 text-yellow-500" />
                Prize Pool: ₹10,000+
            </div>
        </div>
    );
}
