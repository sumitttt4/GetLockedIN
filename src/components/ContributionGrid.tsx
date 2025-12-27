"use client";

import { cn } from "@/lib/utils";

interface ContributionGridProps {
    className?: string;
}

// Generate deterministic mock data for 365 days
const generateMockData = () => {
    const data = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        // Deterministic "random" based on date
        const seed = date.getDate() + date.getMonth() * 31;
        const isLogged = (seed * 17) % 100 > 40;
        const isMissed = !isLogged && (seed * 23) % 100 > 70;
        const isCurrentlyLockedIn = i === 0 && (seed * 7) % 100 > 50;

        data.push({
            date: date.toISOString().split('T')[0],
            status: isCurrentlyLockedIn ? 'active' : isLogged ? 'completed' : isMissed ? 'missed' : 'empty',
        });
    }

    return data;
};

const mockData = generateMockData();

export function ContributionGrid({ className }: ContributionGridProps) {
    // Group data by weeks (7 days per column)
    const weeks: typeof mockData[] = [];
    for (let i = 0; i < mockData.length; i += 7) {
        weeks.push(mockData.slice(i, i + 7));
    }

    return (
        <div className={cn("w-full", className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    365 Day Grid
                </h3>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-green-500" />
                        Shipped
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-red-400" />
                        Missed
                    </span>
                </div>
            </div>

            {/* Grid */}
            <div className="overflow-x-auto pb-2">
                <div className="flex gap-[2px] min-w-max">
                    {weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[2px]">
                            {week.map((day, dayIndex) => (
                                <div
                                    key={`${weekIndex}-${dayIndex}`}
                                    className={cn(
                                        "w-2.5 h-2.5 rounded-sm transition-all duration-200 hover:scale-150 cursor-pointer",
                                        day.status === 'active' && "bg-green-400 animate-pulse",
                                        day.status === 'completed' && "bg-green-500",
                                        day.status === 'missed' && "bg-red-400",
                                        day.status === 'empty' && "bg-zinc-200"
                                    )}
                                    title={`${day.date}: ${day.status}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-4 text-xs font-mono">
                <div className="text-zinc-500">
                    <span className="text-green-600 font-bold">{mockData.filter(d => d.status === 'completed' || d.status === 'active').length}</span> shipped
                </div>
                <div className="text-zinc-500">
                    <span className="text-red-600 font-bold">{mockData.filter(d => d.status === 'missed').length}</span> missed
                </div>
                <div className="text-zinc-500">
                    Streak: <span className="text-zinc-900 font-bold">12</span> days
                </div>
            </div>
        </div>
    );
}
