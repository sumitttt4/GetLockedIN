"use client";

import { cn } from "@/lib/utils";

interface GlobalFeedProps {
    className?: string;
}

const mockEvents = [
    { type: 'locked_in', user: 'Sumit', duration: '2 hours' },
    { type: 'shipped', user: 'Alex', task: 'Auth System' },
    { type: 'duel_started', user1: 'Sarah', user2: 'David' },
    { type: 'joined_league', user: 'Marcus', league: 'January Sprint' },
    { type: 'shipped', user: 'Jessica', task: 'Landing Page V2' },
    { type: 'locked_in', user: 'Rahul', duration: '45 mins' },
    { type: 'duel_won', user: 'Priya', opponent: 'Karan' },
    { type: 'shipped', user: 'Ankit', task: 'Payment Integration' },
];

const formatEvent = (event: typeof mockEvents[0]) => {
    switch (event.type) {
        case 'locked_in':
            return `${event.user} is Locked In (${event.duration})`;
        case 'shipped':
            return `${event.user} just shipped: "${event.task}"`;
        case 'duel_started':
            return `${event.user1} started a Duel with ${event.user2}`;
        case 'joined_league':
            return `${event.user} joined the ${event.league} League`;
        case 'duel_won':
            return `${event.user} defeated ${event.opponent} in a Duel!`;
        default:
            return '';
    }
};

const getEventColor = (type: string) => {
    switch (type) {
        case 'locked_in':
            return 'text-green-600';
        case 'shipped':
            return 'text-blue-600';
        case 'duel_started':
        case 'duel_won':
            return 'text-red-500';
        case 'joined_league':
            return 'text-yellow-600';
        default:
            return 'text-zinc-600';
    }
};

export function GlobalFeed({ className }: GlobalFeedProps) {
    // Duplicate events for seamless loop
    const allEvents = [...mockEvents, ...mockEvents];

    return (
        <div className={cn(
            "relative overflow-hidden bg-zinc-50 border-y border-zinc-200 py-3",
            className
        )}>
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent z-10" />

            {/* Scrolling Content */}
            <div className="animate-marquee flex whitespace-nowrap gap-12">
                {allEvents.map((event, i) => (
                    <span
                        key={i}
                        className={cn(
                            "flex items-center gap-2 text-xs font-mono",
                            getEventColor(event.type)
                        )}
                    >
                        <span className="w-1 h-1 rounded-full bg-current" />
                        {formatEvent(event)}
                    </span>
                ))}
            </div>
        </div>
    );
}
