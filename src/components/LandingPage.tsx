"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CountdownTimer } from "@/components/landing/CountdownTimer";
import { LiveActivityBadge } from "@/components/landing/LiveActivityBadge";
import { Navbar } from "@/components/layout/Navbar";
import {
    Lock,
    Zap,
    Target,
    Trophy,
    TrendingUp,
    Check
} from "lucide-react";
import Link from "next/link";
import { ContributionGrid } from "@/components/ContributionGrid";
import { DuelCard } from "@/components/DuelCard";
import { LockedInSwitch } from "@/components/LockedInSwitch";
import { DailyLogPreview } from "@/components/landing/DailyLogPreview";
import { Marquee } from "@/components/landing/Marquee";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import SmoothScroll from "@/components/SmoothScroll";

export default function LandingPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleWaitlistSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setSubmitted(true);
                sessionStorage.setItem("waitlist_email", email);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#22c55e', '#ffffff', '#000000']
                });
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Error joining waitlist');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen relative overflow-x-hidden">
            <SmoothScroll />
            {/* Crosshatch Art - Light Pattern */}
            <div
                className="fixed inset-0 z-0 pointer-events-none bg-white"
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
                                        Build in public where{" "}
                                        <span className="font-semibold text-zinc-900">showing up daily</span>{" "}
                                        is the only thing that matters.
                                    </p>
                                </motion.div>

                                {/* CTA */}
                                <motion.div
                                    className="w-full max-w-md space-y-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    {!submitted ? (
                                        <form onSubmit={handleWaitlistSubmit} className="flex items-center space-x-2 bg-white p-2 rounded-xl border border-zinc-200 shadow-xl shadow-zinc-200/50 focus-within:border-zinc-400 transition-all">
                                            <Input
                                                type="email"
                                                placeholder="your@email.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="border-0 focus-visible:ring-0 shadow-none text-base bg-transparent h-11 font-medium text-zinc-900 placeholder:text-zinc-400 pl-4"
                                            />
                                            <Button
                                                type="submit"
                                                disabled={loading || !email}
                                                className="h-11 px-6 bg-black hover:bg-zinc-800 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {loading ? "Joining..." : "Join Waitlist"}
                                            </Button>
                                        </form>
                                    ) : (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-4 shadow-sm"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                                <Check className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-zinc-900 font-bold">You&apos;re LockedIN!</p>
                                                <p className="text-zinc-500 text-sm mb-2">Check your inbox for confirmation.</p>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="h-7 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 bg-white"
                                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=I%20just%20joined%20the%20war%20against%20mediocrity.%20%0A%0ASecure%20your%20spot%20on%20the%20GetLockedIN%20protocol%20for%202026.%20%F0%9F%94%92%20%0A%0Ahttps%3A%2F%2Fgetlockedin.live`, '_blank')}
                                                >
                                                    Share on X
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    <p className="text-sm text-zinc-400">
                                        <span className="text-green-600 font-semibold">$5 early bird</span> · Limited spots · Lifetime access
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Marquee */}
                    <Marquee className="mb-20" />

                    {/* Features Section (GSAP Animated) */}
                    <FeaturesSection />

                    {/* Pricing Section */}
                    <section id="pricing" className="py-24 border-t border-zinc-100 scroll-mt-16">
                        <div className="max-w-5xl mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-4">
                                    Simple Pricing
                                </h2>
                                <p className="text-zinc-500 text-lg">
                                    One-time payment. Lifetime access. No subscriptions.
                                </p>
                            </div>

                            <div className="max-w-md mx-auto">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                >
                                    <Card className="relative bg-gradient-to-b from-white to-zinc-50 border-zinc-200 shadow-xl hover:shadow-2xl transition-all">
                                        {/* Badge */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                            <div className="px-4 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md shadow-orange-200">
                                                <Zap className="w-3.5 h-3.5 fill-current" />
                                                EARLY BIRD - Limited Spots
                                            </div>
                                        </div>

                                        <CardContent className="p-8 pt-10">
                                            {/* Icon */}
                                            <div className="flex justify-center mb-4">
                                                <div className="w-16 h-16 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center text-zinc-900 shadow-sm">
                                                    <Lock className="w-8 h-8" />
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="text-center mb-6">
                                                <div className="flex items-center justify-center gap-3 mb-2">
                                                    <span className="text-zinc-400 line-through text-2xl">$9</span>
                                                    <span className="text-6xl font-black text-zinc-900">$5</span>
                                                </div>
                                                <div className="text-zinc-500">One-time payment</div>
                                            </div>

                                            {/* Features */}
                                            <div className="space-y-3 mb-8">
                                                <div className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-zinc-700">Lifetime access to DayZero</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-zinc-700">Early access (Dec 31st)</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-zinc-700">Founder&apos;s Badge profile</span>
                                                </div>
                                                <div className="flex items-start gap-3">
                                                    <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                    <span className="text-zinc-700">Future Pro features included</span>
                                                </div>
                                            </div>

                                            <Link href="/checkout">
                                                <Button className="w-full h-14 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg shadow-lg shadow-zinc-900/20">
                                                    Get Lifetime Access
                                                </Button>
                                            </Link>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="py-24 border-t border-zinc-100">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900">
                                    Ready to make 2026 different?
                                    <br />
                                    <span className="text-green-600">Join the waitlist.</span>
                                </h2>

                                <div className="flex flex-col items-center gap-4 pt-6">
                                    <Link href="#hero">
                                        <Button size="lg" className="h-14 px-10 bg-black hover:bg-zinc-800 text-white text-lg font-semibold shadow-xl shadow-black/20 hover:scale-105 transition-transform">
                                            Join Waitlist
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="border-t border-zinc-100 py-12 bg-zinc-50/50">
                        <div className="max-w-6xl mx-auto px-6">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 w-6 bg-black rounded-lg flex items-center justify-center">
                                        <Lock className="h-3 w-3 text-white" />
                                    </div>
                                    <span className="font-semibold text-zinc-900">GetLockedIN</span>
                                </div>

                                <div className="flex items-center gap-6 text-sm text-zinc-500">
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Terms</a>
                                    <a href="#" className="hover:text-zinc-900 transition-colors">Contact</a>
                                </div>

                                <p className="text-sm text-zinc-400">
                                    © 2026 GetLockedIN. Consistency is the only currency.
                                </p>
                            </div>
                        </div>
                    </footer>
                </main>
            </div>
        </div >
    );
}
