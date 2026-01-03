"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Flame, CheckCircle2, XCircle } from "lucide-react";

interface LogDay {
    date: string; // YYYY-MM-DD
    status: 'shipped' | 'missed' | 'frozen';
    count: number;
}

interface ConsistencyGridProps {
    logs: LogDay[];
    streak: number;
    className?: string;
}

export function ConsistencyGrid({ logs, streak, className }: ConsistencyGridProps) {
    // Generate last 28 days for the grid (4 weeks)
    const days = [];
    const today = new Date();

    // Create a map for easy lookup
    const logMap = new Map(logs.map(l => [l.date, l]));

    for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];

        days.push({
            date: dateStr,
            fullDate: d,
            data: logMap.get(dateStr)
        });
    }

    return (
        <div className={cn("bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]", className)}>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 border-2 border-orange-500 rounded-none">
                        <Flame className={cn("w-6 h-6 text-orange-600", streak > 0 && "animate-pulse")} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Current Streak</div>
                        <div className="text-3xl font-black leading-none">{streak} <span className="text-sm text-zinc-400 font-medium">days</span></div>
                    </div>
                </div>

                <div className="text-right hidden sm:block">
                    <div className="text-[10px] font-bold uppercase text-zinc-400">Consistency Score</div>
                    <div className="text-xl font-bold font-mono">
                        {Math.round((logs.length / 30) * 100)}%
                    </div>
                </div>
            </div>

            {/* THE GRID */}
            <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                    <div key={i} className="text-center text-[10px] font-bold text-zinc-300 mb-1">
                        {day}
                    </div>
                ))}

                {days.map((day) => {
                    const isToday = day.date === today.toISOString().split('T')[0];
                    const hasData = !!day.data;

                    return (
                        <div
                            key={day.date}
                            className="aspect-square relative group"
                        >
                            <div
                                className={cn(
                                    "w-full h-full border-2 transition-all",
                                    hasData
                                        ? "bg-[#00FF00] border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        : "bg-zinc-50 border-zinc-200",
                                    isToday && !hasData && "border-dashed border-black animate-pulse"
                                )}
                            />

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10 w-max">
                                <div className="bg-black text-white text-[10px] uppercase font-bold px-2 py-1 relative">
                                    {day.fullDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    {hasData ? " - SHIPPED" : ""}
                                    {/* Arrow */}
                                    <div className="w-2 h-2 bg-black absolute top-full left-1/2 -translate-x-1/2 rotate-45 -mt-1" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                <span>Last 4 Weeks</span>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-zinc-50 border border-zinc-200" />
                        <span>Missed</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-3 h-3 bg-[#00FF00] border border-black" />
                        <span>Shipped</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
