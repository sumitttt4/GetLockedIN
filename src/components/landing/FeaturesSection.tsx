"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ContributionGrid } from "@/components/ContributionGrid";
import { DuelCard } from "@/components/DuelCard";
import { LockedInSwitch } from "@/components/LockedInSwitch";
import { DailyLogPreview } from "@/components/landing/DailyLogPreview";
import { GeometricIllustration } from "@/components/landing/GeometricIllustration";
import {
    Target,
    Zap,
    TrendingUp,
    Trophy
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function FeaturesSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        const cards = cardsRef.current.filter(Boolean);
        if (!process.env.NEXT_PUBLIC_DISABLE_ANIMATION) { // Safety flag if needed, or just run
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${cards.length * 100}%`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            // Initial state: Card 1 is visible. Others are offset.
            // Actually, with stacking cards, we typically want them to slide ON TOP of each other.
            // So Card 2 slides up to cover Card 1. Card 3 slides up to cover Card 2.

            // Reset all cards to absolute position to stack them ??
            // Or use pure translation. 
            // Better approach for stacking:
            // All cards are absolute top-0 left-0 w-full h-full (or centred).
            // Card 1 zIndex: 1. Card 2 zIndex: 2. Card 3 zIndex: 3.
            // Card 2 and 3 start at y: '100vw' or '100%'.

            cards.forEach((card, i) => {
                if (i === 0) return; // First card stays put

                // Animate card i from y: 100% to y: 0%
                tl.fromTo(card,
                    { y: "150%" },
                    { y: "0%", ease: "none", duration: 1 }
                );
            });

            // Fade out the header as we scroll?
            tl.to(headerRef.current, { opacity: 0, duration: 0.5 }, 0);
        }
    }, { scope: containerRef });

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    return (
        <section ref={containerRef} id="features" className="relative h-screen bg-transparent overflow-hidden">

            {/* Header */}
            <div ref={headerRef} className="absolute top-10 left-0 w-full z-10 text-center px-4 pointer-events-none">
                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 drop-shadow-sm">
                    The Protocol
                </h2>
                <p className="text-lg text-zinc-500">
                    Scroll to explore the system.
                </p>
            </div>

            {/* Cards Container */}
            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center px-6 pt-24 pb-12">

                {/* --- CARD 1: THE PROOF (Lime/Growth) --- */}
                <div ref={addToRefs} className="absolute w-full max-w-5xl h-[65vh] bg-gradient-to-br from-lime-50 to-lime-100 border border-lime-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[1]">
                    <div className="p-8 border-b border-zinc-100/50 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-emerald-100 rounded-lg">
                                <Target className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">Grid of Truth</h3>
                                <p className="text-sm text-zinc-500">Public accountability ledger</p>
                            </div>
                        </div>
                        <div className="text-xs font-mono text-emerald-600/50 font-bold tracking-widest uppercase">
                            Phase 01
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-center">
                        <p className="text-zinc-600 mb-6 max-w-xl">
                            365-day public consistency record. Filled = showed up. Empty = missed.
                            No editing. No hiding. Pure accountability.
                        </p>
                        <div className="bg-zinc-50 rounded-xl border border-zinc-200 p-6 shadow-inner">
                            <ContributionGrid />
                        </div>
                    </div>
                </div>

                {/* --- CARD 2: FOCUS MODE (Phase 02) --- */}
                <div ref={addToRefs} className="absolute w-full max-w-5xl h-[65vh] bg-[#F5F3FF] border border-violet-100 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col z-[2] translate-y-[150%]">

                    {/* Header Badge */}
                    <div className="absolute top-8 right-8 z-10">
                        <span className="text-xs font-bold tracking-[0.2em] text-violet-400 uppercase">Phase 02</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative p-12">
                        {/* Centered Focus Interface */}
                        <div className="bg-white rounded-[2rem] p-12 w-full max-w-lg shadow-xl shadow-violet-100/50 flex flex-col items-center gap-10 border border-violet-50 relative z-10">

                            <div className="text-center space-y-2">
                                <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">Active Session</h3>
                                <div className="text-7xl md:text-8xl font-black text-zinc-800 tracking-tighter tabular-nums font-[family-name:var(--font-geist-mono)]">
                                    00:00:00
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                                Ready to lock in
                            </div>

                            <Button
                                className="w-full h-16 bg-black hover:bg-zinc-900 text-white rounded-full text-lg font-bold tracking-widest uppercase transition-transform hover:scale-[1.02] shadow-xl shadow-black/10 flex items-center justify-center gap-3"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                Lock In
                            </Button>
                        </div>

                        {/* Decor / Floating Elements */}
                        <div className="absolute top-1/2 right-24 -translate-y-1/2 hidden lg:flex flex-col gap-6 opacity-80 pointer-events-none">
                            {/* Abstract App Window */}
                            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg border border-violet-50 transform rotate-12 flex items-center justify-center">
                                <div className="w-12 h-12 rounded-xl bg-violet-50" />
                            </div>
                            {/* C Loading Shape */}
                            <div className="w-32 h-32 bg-white rounded-[2rem] shadow-lg border border-violet-50 transform -rotate-6 flex items-center justify-center">
                                <svg className="w-12 h-12 text-orange-500 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CARD 3: DAILY LOG (Pink/Rose - Personal) --- */}
                <div ref={addToRefs} className="absolute w-full max-w-5xl h-[65vh] bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[3] translate-y-[150%]">
                    <div className="p-8 border-b border-zinc-100/50 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-pink-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-pink-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">Daily Log</h3>
                                <p className="text-sm text-zinc-500">Track your progress</p>
                            </div>
                        </div>
                        <div className="text-xs font-mono text-pink-500 font-bold tracking-widest uppercase">
                            Phase 03
                        </div>
                    </div>
                    <div className="p-8 flex-1 overflow-hidden flex items-center justify-center bg-zinc-50/50">
                        <div className="w-full max-w-2xl shadow-lg border border-zinc-200 rounded-xl overflow-hidden">
                            <DailyLogPreview className="w-full" />
                        </div>
                    </div>
                </div>

                {/* --- CARD 4: METRICS (Blue/Trust) --- */}
                <div ref={addToRefs} className="absolute w-full max-w-5xl h-[65vh] bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[4] translate-y-[150%]">
                    <div className="p-8 border-b border-zinc-100/50 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">Revenue Metrics</h3>
                                <p className="text-sm text-zinc-500">Visualize your growth</p>
                            </div>
                        </div>
                        <div className="text-xs font-mono text-blue-500 font-bold tracking-widest uppercase">
                            Phase 04
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex items-center justify-center relative">
                        {/* Floating Icons Background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-100/50 to-transparent" />
                        </div>

                        {/* Main Floating Card */}
                        <div className="relative bg-white rounded-3xl p-8 shadow-2xl border border-blue-100 w-full max-w-[400px] z-10 mx-auto">

                            {/* Stripe (Top Left) */}
                            <div className="absolute -top-6 -left-6 w-12 h-12 bg-[#635BFF] rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-4 border-white overflow-hidden">
                                <span className="text-white font-bold text-2xl italic pr-0.5">S</span>
                            </div>

                            {/* Dodo Payments (Top Right) */}
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#E5F849] rounded-full flex items-center justify-center shadow-lg transform rotate-12 border-4 border-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-black fill-current">
                                    <path d="M16.5 3C19.5376 3 22 5.46243 22 8.5C22 11.5376 19.5376 14 16.5 14H5V8.5C5 5.46243 7.46243 3 10.5 3H16.5Z" />
                                    <path d="M5 14H16.5C18.5 14 20.5 15 21 17C21.5 19 20 21 18 21H5V14Z" />
                                    <circle cx="17.5" cy="8.5" r="1.5" fill="white" />
                                </svg>
                            </div>

                            {/* Polar (Bottom Left) */}
                            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg transform rotate-12 border-4 border-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                                    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
                                    <ellipse cx="12" cy="12" rx="10" ry="4" />
                                </svg>
                            </div>

                            {/* Lemon Squeezy (Bottom Right) */}
                            <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#7047EB] rounded-full flex items-center justify-center shadow-lg transform -rotate-12 border-4 border-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="none" className="text-[#FFDD00] fill-current">
                                    <path d="M15.5 2L13.5 13H21L9.5 22L11 9.5H3.5L15.5 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                </svg>
                            </div>

                            {/* Card Content */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-zinc-500 font-medium">
                                    <TrendingUp className="w-5 h-5 text-blue-500" />
                                    <span>Revenue Goal</span>
                                </div>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold text-zinc-900 tracking-tight">$8,420</span>
                                    <span className="text-xl text-zinc-400 font-medium">/ $10,000</span>
                                </div>

                                <div className="space-y-2">
                                    <div className="h-3 w-full bg-zinc-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[84%] rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-zinc-400 pt-2">
                                    <div className="w-4 h-4 rounded-full border-2 border-zinc-200 border-t-blue-500 animate-spin" />
                                    <span>Auto-syncing via Stripe...</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CARD 5: THE ARENA (Amber/Energy) --- */}
                <div ref={addToRefs} className="absolute w-full max-w-5xl h-[65vh] bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-[5] translate-y-[150%]">
                    <div className="p-8 border-b border-zinc-100/50 bg-white/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-amber-100 rounded-lg">
                                <Trophy className="w-5 h-5 text-amber-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-zinc-900">1v1 Battles</h3>
                                <p className="text-sm text-zinc-500">Competitive accountability</p>
                            </div>
                        </div>
                        <div className="text-xs font-mono text-amber-500 font-bold tracking-widest uppercase">
                            Phase 05
                        </div>
                    </div>
                    <div className="p-8 flex-1 flex items-center justify-center bg-gradient-to-b from-transparent to-orange-50/30">
                        <div className="w-full max-w-md">
                            <DuelCard
                                challenger={{ name: "You", username: "you", hp: 100 }}
                                opponent={{ name: "Alex", username: "alex", hp: 45 }}
                                daysRemaining={4}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
