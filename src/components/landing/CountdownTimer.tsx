"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const launchDate = new Date("2025-12-31T00:00:00Z");

        const updateCountdown = () => {
            const now = new Date();
            const diff = launchDate.getTime() - now.getTime();

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-3 px-4 py-2.5 bg-orange-50 border border-orange-100 rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-orange-600" />
            <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-zinc-600 font-medium">Launch in:</span>
                <span className="text-orange-600 font-bold">
                    {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </span>
            </div>
        </div>
    );
}
