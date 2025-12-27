"use client";

import { cn } from "@/lib/utils";
import { Swords, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DuelCardProps {
    className?: string;
    challenger: {
        name: string;
        username: string;
        hp: number;
        avatar?: string;
    };
    opponent: {
        name: string;
        username: string;
        hp: number;
        avatar?: string;
    };
    daysRemaining: number;
    isActive?: boolean;
}

export function DuelCard({
    className,
    challenger,
    opponent,
    daysRemaining,
}: DuelCardProps) {
    return (
        <div className={cn(
            "relative p-5 rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm",
            className
        )}>
            {/* Header */}
            <div className="relative flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs uppercase tracking-widest">
                    <Swords className="w-3 h-3" />
                    7-Day Duel
                </div>
                <div className="text-xs font-mono text-zinc-400">
                    {daysRemaining}d left
                </div>
            </div>

            {/* Battle Arena */}
            <div className="relative space-y-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white">
                                {challenger.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-bold text-zinc-900 text-sm">{challenger.name}</div>
                                <div className="text-xs text-zinc-400">@{challenger.username}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={cn(
                                "text-lg font-bold font-mono",
                                challenger.hp > 50 ? "text-orange-600" : challenger.hp > 25 ? "text-zinc-500" : "text-red-500"
                            )}>
                                {challenger.hp}%
                            </div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 rounded-full",
                                challenger.hp > 50 ? "bg-orange-600" : challenger.hp > 25 ? "bg-zinc-400" : "bg-red-500"
                            )}
                            style={{ width: `${challenger.hp}%` }}
                        />
                    </div>
                </div>

                {/* VS Divider */}
                <div className="flex items-center justify-center py-1">
                    <div className="px-3 py-1 bg-zinc-100 rounded-full border border-zinc-200">
                        <span className="font-black text-zinc-400 text-xs">VS</span>
                    </div>
                </div>

                {/* Opponent */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-500 font-bold text-xs">
                                {opponent.name.substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <div className="font-bold text-zinc-900 text-sm">{opponent.name}</div>
                                <div className="text-xs text-zinc-400">@{opponent.username}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className={cn(
                                "text-lg font-bold font-mono",
                                opponent.hp > 50 ? "text-orange-600" : opponent.hp > 25 ? "text-zinc-500" : "text-red-500"
                            )}>
                                {opponent.hp}%
                            </div>
                        </div>
                    </div>
                    <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 rounded-full",
                                opponent.hp > 50 ? "bg-orange-600" : opponent.hp > 25 ? "bg-zinc-400" : "bg-red-500"
                            )}
                            style={{ width: `${opponent.hp}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>Started 3d ago</span>
                {opponent.hp < 25 && (
                    <span className="flex items-center gap-1 text-green-600 font-bold">
                        <Trophy className="w-3 h-3" />
                        Victory imminent
                    </span>
                )}
            </div>
        </div>
    );
}

// Challenge Button Component
export function ChallengeButton({ className }: { className?: string }) {
    return (
        <Button
            variant="outline"
            className={cn(
                "border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-mono uppercase tracking-widest text-xs",
                className
            )}
        >
            <Swords className="w-3 h-3 mr-2" />
            Challenge
        </Button>
    );
}
