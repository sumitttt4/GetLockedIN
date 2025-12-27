"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="relative bg-white border-t border-zinc-200 py-16 px-6 overflow-hidden">
            <div className="max-w-4xl mx-auto flex flex-col items-start gap-8 relative z-10">

                <div className="space-y-4 max-w-lg">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">
                        Built by Sumit.
                    </h3>

                    <div className="space-y-2 text-zinc-500 font-medium">
                        <p>
                            I&apos;m building this in public. Follow updates on <a href="https://x.com/Sumitthq" target="_blank" className="text-zinc-900 underline underline-offset-2 hover:text-black">X/Twitter</a>.
                        </p>
                        <p>
                            Make it count. <Heart className="w-3 h-3 text-red-500 fill-current inline-block" />
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full justify-between">
                    <Button className="bg-zinc-900 text-white hover:bg-zinc-800 rounded-full px-8 h-11 font-medium transition-transform hover:scale-105">
                        Get Started
                    </Button>

                    <div className="flex items-center gap-6 text-sm text-zinc-500">
                        <span>© 2026 DayZero.</span>
                    </div>
                </div>

            </div>

            {/* Giant Watermark Text */}
            <div
                className="absolute bottom-0 left-0 right-0 text-center select-none pointer-events-none overflow-hidden"
                aria-hidden="true"
            >
                <span className="text-[clamp(4rem,20vw,12rem)] font-black tracking-tighter text-zinc-900/50 leading-none whitespace-nowrap">
                    GetLockedIN
                </span>
            </div>
        </footer>
    );
}
