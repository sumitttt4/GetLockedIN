"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import {
    Lock,
    Zap,
    Check
} from "lucide-react";
import Link from "next/link";
import { LiveGoalsTicker } from "@/components/LiveGoalsTicker";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";

export default function LandingPage() {


    // Simple state for UI interactions if needed, or remove if unused.
    // Cleaned up waitlist logic as the project is now shipping.


    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
            <SmoothScroll />
            {/* Crosshatch Art - Light Pattern */}
            <div
                className="fixed inset-0 z-0 pointer-events-none bg-zinc-100"
                style={{
                    backgroundImage: `
                        repeating-linear-gradient(22.5deg, transparent, transparent 2px, rgba(75, 85, 99, 0.06) 2px, rgba(75, 85, 99, 0.06) 3px, transparent 3px, transparent 8px),
                        repeating-linear-gradient(67.5deg, transparent, transparent 2px, rgba(107, 114, 128, 0.05) 2px, rgba(107, 114, 128, 0.05) 3px, transparent 3px, transparent 8px),
                        repeating-linear-gradient(112.5deg, transparent, transparent 2px, rgba(55, 65, 81, 0.04) 2px, rgba(55, 65, 81, 0.04) 3px, transparent 3px, transparent 8px),
                        repeating-linear-gradient(157.5deg, transparent, transparent 2px, rgba(31, 41, 55, 0.03) 2px, rgba(31, 41, 55, 0.03) 3px, transparent 3px, transparent 8px)
                    `,
                }}
            />
            {/* Content */}
            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                <main className="flex-1">
                    {/* Hero Section */}
                    <section id="hero" className="pt-20 pb-16 md:pt-28 md:pb-24 relative overflow-hidden">
                        {/* Background Grid */}
                        <div className="absolute inset-0 pattern-grid opacity-10" />

                        {/* Animated Background Blob - Subtler in light mode */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-emerald-100 to-transparent opacity-60 blur-3xl animate-pulse-subtle -z-10" />

                        <div className="max-w-6xl mx-auto px-6 relative z-10">
                            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
                                {/* Headline */}

                                {/* Headline */}
                                <motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-zinc-900">
                                        <span>Another year.</span>
                                        <br />
                                        <span>Another broken promise?</span>
                                        <br />
                                        <span className="text-zinc-400">Not this time.</span>
                                    </h1>
                                    <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                                        The accountability protocol for high performers.
                                        <br className="hidden md:block" />
                                        <span className="font-bold text-zinc-900">No excuses. No edits. Just shipping.</span>
                                    </p>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    className="w-full max-w-md space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto">

                                        {/* THE ACTION BLOCK */}
                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const form = e.target as HTMLFormElement;
                                                const input = form.querySelector('input') as HTMLInputElement;
                                                const username = input.value;
                                                // Redirect to Login with pre-filled username intent
                                                window.location.href = `/login?username=${encodeURIComponent(username)}`;
                                            }}
                                            className="flex flex-col sm:flex-row w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        >

                                            {/* 1. THE INPUT: Claiming Identity */}
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Claim your @handle..."
                                                className="flex-1 rounded-none border-2 border-black bg-white px-4 py-4 font-mono text-sm placeholder:text-gray-500 focus:border-black focus:ring-0 outline-none w-full"
                                                required
                                            />

                                            {/* 2. THE BUTTON: High Contrast Command */}
                                            <button
                                                type="submit"
                                                className="rounded-none border-2 border-l-0 border-black bg-black px-8 py-4 text-sm font-black uppercase tracking-wider text-white hover:bg-[#00FF00] hover:text-black transition-all w-full sm:w-auto"
                                            >
                                                Get Locked In
                                            </button>

                                        </form>

                                        {/* 3. THE SCARCITY TRIGGER (Replaces 'Live now...') */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <p className="text-xs font-mono font-bold uppercase text-gray-900 tracking-tight">
                                                Only 42 Founder Badges Remaining
                                            </p>
                                        </div>

                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Live Ticker */}
                    <LiveGoalsTicker className="mb-20" />

                    {/* Features Section (GSAP Animated) */}
                    <FeaturesSection />

                    {/* FAIL-SAFE: Check for auth code redirect */}
                    {/* If user lands here with ?code=..., manually forward to callback */}
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            const urlParams = new URLSearchParams(window.location.search);
                            const code = urlParams.get('code');
                            if (code) {
                                window.location.href = '/auth/callback?code=' + code;
                            }
                        })();
                        `
                    }} />

                    {/* Pricing Section */}
                    {/* Pricing Section */}
                    <section id="pricing" className="py-24 border-t border-zinc-200 scroll-mt-16">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-6">
                                    Simple Pricing
                                </h2>
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                                                <img
                                                    src={`https://api.dicebear.com/9.x/notionists/svg?seed=${i * 342}&backgroundColor=ffdfbf,c0aede,b6e3f4`}
                                                    alt="User"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-left text-sm font-semibold text-zinc-600 leading-tight">
                                        <span className="text-black">342 people</span> <br />
                                        building now
                                    </div>
                                </div>
                                <p className="text-lg md:text-xl font-medium text-zinc-700 max-w-2xl mx-auto leading-relaxed">
                                    You can watch them for free, or you can join them for $9.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
                                {/* CARD 1: THE TRAP (Free) */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Card className="relative bg-white border border-zinc-200 shadow-none">
                                        <CardContent className="p-8">
                                            <div className="text-center mb-6">
                                                <h3 className="text-xl font-bold text-zinc-500 uppercase tracking-widest">Spectator</h3>
                                                <div className="mt-4 mb-2">
                                                    <span className="text-5xl font-black text-zinc-400">$0</span>
                                                </div>
                                                <p className="text-sm text-zinc-500">Just watching. No commitment.</p>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3">
                                                    <Check className="w-5 h-5 text-zinc-400" />
                                                    <span className="text-zinc-600">View the Global "Grid of Truth"</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Check className="w-5 h-5 text-zinc-400" />
                                                    <span className="text-zinc-600">Access to Public Leaderboard</span>
                                                </div>
                                                <div className="flex items-center gap-3 opacity-50">
                                                    <div className="w-5 h-5 flex items-center justify-center">
                                                        <div className="w-4 h-0.5 bg-zinc-300 rotate-45 absolute" />
                                                        <div className="w-4 h-0.5 bg-zinc-300 -rotate-45 absolute" />
                                                    </div>
                                                    <span className="text-zinc-400">Cannot create a profile</span>
                                                </div>
                                                <div className="flex items-center gap-3 opacity-50">
                                                    <div className="w-5 h-5 flex items-center justify-center">
                                                        <div className="w-4 h-0.5 bg-zinc-300 rotate-45 absolute" />
                                                        <div className="w-4 h-0.5 bg-zinc-300 -rotate-45 absolute" />
                                                    </div>
                                                    <span className="text-zinc-400">Cannot join 1v1 Battles</span>
                                                </div>
                                                <div className="flex items-center gap-3 opacity-50">
                                                    <div className="w-5 h-5 flex items-center justify-center">
                                                        <div className="w-4 h-0.5 bg-zinc-300 rotate-45 absolute" />
                                                        <div className="w-4 h-0.5 bg-zinc-300 -rotate-45 absolute" />
                                                    </div>
                                                    <span className="text-zinc-400">No Founder&apos;s Badge</span>
                                                </div>
                                            </div>

                                            <Button variant="outline" className="w-full h-12 bg-white border border-black text-black hover:bg-zinc-50 font-medium rounded-md">
                                                Spectate
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {/* CARD 2: THE GOAL ($9) */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                >
                                    <Card className="relative bg-black border-none shadow-2xl hover:scale-[1.02] transition-transform z-10">
                                        {/* Badge */}
                                        <div className="absolute -top-4 inset-x-0 flex justify-center">
                                            <div className="px-4 py-1.5 bg-white border border-black text-black text-xs font-bold tracking-widest uppercase rounded-full shadow-lg">
                                                Day 1 Cohort
                                            </div>
                                        </div>

                                        <CardContent className="p-8 pt-12">
                                            <div className="text-center mb-6">
                                                <h3 className="text-2xl font-black text-white uppercase tracking-widest">Operator</h3>
                                                <div className="mt-4 mb-2 flex items-center justify-center gap-2">
                                                    <span className="text-6xl font-black text-green-500">$9</span>
                                                    <span className="text-lg font-bold text-zinc-400 self-end mb-2">/ lifetime</span>
                                                </div>
                                                <p className="text-sm font-semibold text-zinc-300">For those ready to ship.</p>
                                            </div>

                                            <div className="space-y-4 mb-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1 bg-green-500 rounded-full">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                    <span className="text-white font-medium">Create your Public Protocol</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1 bg-green-500 rounded-full">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                    <span className="text-white font-medium">Verified &quot;Locked In&quot; Status</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1 bg-green-500 rounded-full">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                    <span className="text-white font-medium">Challenge others to 1v1 Battles</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1 bg-green-500 rounded-full">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                    <span className="text-white font-medium">Lifetime Access (LockedIn included)</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1 bg-green-500 rounded-full">
                                                        <Check className="w-3 h-3 text-black" />
                                                    </div>
                                                    <span className="text-white font-medium">Founder&apos;s Badge (First 100)</span>
                                                </div>
                                            </div>

                                            <Link href="/checkout">
                                                <Button className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-bold text-lg rounded-xl tracking-tight shadow-lg transition-transform hover:scale-[1.02]">
                                                    Initialize Protocol - $9
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-24 border-t border-zinc-200">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
                                    Ready to make 2026 different?
                                    <br />
                                    <span className="text-green-600">Start today.</span>
                                </h2>

                                <div className="flex flex-col items-center gap-4 pt-6">
                                    <Link href="/checkout">
                                        <Button size="lg" className="h-14 px-10 bg-black hover:bg-zinc-800 text-white text-lg font-semibold shadow-xl shadow-black/20 hover:scale-105 transition-transform">
                                            Get Locked In
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-zinc-200 py-12 bg-zinc-100">
                        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 rounded-full border border-zinc-200">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-xs font-mono font-medium text-zinc-600">All Systems Operational</span>
                            </div>

                            <p className="text-sm text-zinc-500 font-mono flex gap-4">
                                <span>© 2025 GetLockedIn Protocol</span>
                                <Link href="/privacy" className="hover:text-black hover:underline">Privacy</Link>
                                <Link href="/terms" className="hover:text-black hover:underline">Terms</Link>
                            </p>
                        </div>
                    </footer>
                </main>
            </div>
        </div >
    );
}
