"use client";

import { useState } from "react";


import { BuyButton } from "@/components/BuyButton";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Check, Zap, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
    const [earlyBirdLeft] = useState(47); // Mock counter





    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col">
            {/* Navbar */}
            <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
                <div className="max-w-6xl mx-auto flex h-16 items-center justify-between px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                        <div className="h-8 w-8 bg-black rounded-lg flex items-center justify-center shadow-lg shadow-black/20">
                            <Lock className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-zinc-900">LockedIn</span>
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-6 py-12">
                <div className="w-full max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 mb-3">
                                Choose Your Plan
                            </h1>
                            <p className="text-zinc-500 text-lg">
                                One-time payment. Lifetime access. No subscriptions.
                            </p>
                        </div>

                        {/* Pricing Cards */}
                        <div className="max-w-md mx-auto">
                            {/* Early Bird */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Card className="relative bg-white border-zinc-200 shadow-xl hover:shadow-2xl transition-all">
                                    {/* Badge */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <div className="px-4 py-1.5 bg-orange-600 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md shadow-orange-200">
                                            <Zap className="w-3.5 h-3.5 fill-current" />
                                            EARLY BIRD - {earlyBirdLeft} LEFT
                                        </div>
                                    </div>

                                    <CardContent className="p-8 pt-10">
                                        {/* Icon */}
                                        <div className="flex justify-center mb-4">
                                            <div className="w-16 h-16 bg-zinc-50 border border-zinc-200 rounded-2xl flex items-center justify-center">
                                                <Sparkles className="w-8 h-8 text-black" />
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="text-center mb-6">
                                            <div className="flex items-center justify-center gap-3 mb-2">
                                                <span className="text-zinc-400 line-through text-2xl">$9</span>
                                                <span className="text-6xl font-black text-zinc-900">$5</span>
                                            </div>
                                            <div className="text-zinc-500">Limited time offer</div>
                                        </div>

                                        {/* Features */}
                                        <div className="space-y-3 mb-8">
                                            <div className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-zinc-700">Lifetime access</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-zinc-700">All future features</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                                                <span className="text-zinc-700">Support development</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Check className="w-5 h-5 text-orange-600 mt-0.5" />
                                                <span className="text-zinc-700">Founder&apos;s Badge on your profile</span>
                                            </div>
                                        </div>

                                        {/* CTA */}
                                        <BuyButton
                                            productId="pdt_0NUvc8v3ozWTrnPigc0ka"
                                            className="w-full h-12 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-base shadow-lg shadow-zinc-900/20"
                                        >
                                            Grab Early Bird Spot
                                        </BuyButton>

                                        <p className="text-center text-zinc-400 text-sm mt-4">
                                            30-day money-back guarantee
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8">
                    <p className="text-zinc-400 text-sm">
                        Secure payment powered by <span className="text-zinc-900 font-medium">DoDo Payments</span>
                    </p>
                    <p className="text-zinc-400 text-xs mt-2">
                        Integration will be added after deployment
                    </p>
                </div>
            </main>
        </div>
    );
}
