"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NoiseFilter } from "@/components/ui/NoiseFilter";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
        },
    },
};



export function Hero() {
    return (
        <section className="relative min-h-screen bg-[#f3f3f1] overflow-hidden flex flex-col items-center justify-center pt-24 pb-12">
            <NoiseFilter />

            {/* --- NOISE LAYER --- */}
            {/* The "Analog Static" grain, masked to show only at edges */}
            <div
                className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply"
                style={{
                    filter: "url(#noise)",
                    maskImage: "radial-gradient(circle at center, transparent 40%, black 100%)",
                    WebkitMaskImage: "radial-gradient(circle at center, transparent 40%, black 100%)"
                }}
            />

            {/* --- FARADAY CAGE GRID --- */}
            {/* Distorted/Glitchy at edges, clean in center */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(circle at center, transparent 30%, black 100%)",
                    WebkitMaskImage: "radial-gradient(circle at center, transparent 30%, black 100%)",
                    filter: "url(#distortion)"
                }}
            />
            {/* Clean center grid */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "4rem 4rem",
                    maskImage: "radial-gradient(circle at center, black 40%, transparent 60%)",
                    WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 60%)",
                }}
            />

            {/* --- DISTRACTIONS (Halftone Typography) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
                <span className="absolute top-[15%] left-[10%] text-6xl font-black text-zinc-900/5 rotate-[-12deg] blur-[2px]">TWITTER</span>
                <span className="absolute top-[25%] right-[12%] text-5xl font-black text-zinc-900/5 rotate-[6deg] blur-[1px]">EMAILS</span>
                <span className="absolute bottom-[20%] left-[15%] text-7xl font-black text-zinc-900/5 rotate-[15deg] blur-[3px]">SLACK</span>
                <span className="absolute bottom-[30%] right-[8%] text-4xl font-black text-zinc-900/5 rotate-[-8deg] blur-[2px]">NOTIFICATIONS</span>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Eyebrow */}
                    <motion.div variants={itemVariants}>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/50 border border-zinc-200 backdrop-blur-sm text-zinc-600 text-xs font-bold tracking-widest uppercase shadow-sm">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Signal Detected
                        </span>
                    </motion.div>

                    {/* Headlines */}
                    <motion.div variants={itemVariants} className="space-y-6 relative">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-zinc-900 leading-[0.9]">
                            STAY<br />
                            LOCKED<br />
                            IN
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            The signal in the noise. <br className="hidden md:block" />
                            Master your environment, ship daily, and prove your work.
                        </p>
                    </motion.div>

                    {/* Interactive Input */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full max-w-md relative group mx-auto"
                    >
                        <div className="relative flex items-center transform transition-transform duration-200 focus-within:scale-105">
                            <Input
                                type="email"
                                className="h-16 pl-6 pr-40 rounded-full border-zinc-300 bg-white/80 backdrop-blur-md shadow-xl shadow-zinc-200/20 text-lg focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:border-zinc-900 hover:border-zinc-400 transition-all font-medium placeholder:text-zinc-400"
                                placeholder="your@email.com"
                            />
                            <div className="absolute right-2 top-2 bottom-2">
                                <Button
                                    size="lg"
                                    className="h-full rounded-full bg-zinc-900 text-white hover:bg-zinc-800 font-bold px-8 transition-all hover:scale-105 text-base shadow-lg shadow-zinc-900/20"
                                >
                                    Join Protocol
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                Limited Spots
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                $5 Early Bird
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <style jsx global>{`
                /* Simple grain animation */
                @keyframes noise {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-5%, -5%); }
                    20% { transform: translate(-10%, 5%); }
                    30% { transform: translate(5%, -10%); }
                    40% { transform: translate(-5%, 15%); }
                    50% { transform: translate(-10%, 5%); }
                    60% { transform: translate(15%, 0); }
                    70% { transform: translate(0, 10%); }
                    80% { transform: translate(-15%, 0); }
                    90% { transform: translate(10%, 5%); }
                }
            `}</style>
        </section>
    );
}
