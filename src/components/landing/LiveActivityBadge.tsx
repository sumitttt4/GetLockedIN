"use client";

import { useEffect, useState } from "react";


export function LiveActivityBadge() {
    const [count, setCount] = useState(1247);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prev) => prev + Math.floor(Math.random() * 3) - 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <div className="flex items-center gap-1.5 text-sm">
                <span className="font-medium text-white/90">
                    {count.toLocaleString()} spots reserved
                </span>
            </div>
        </div>
    );
}
