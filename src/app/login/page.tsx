"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-zinc-50 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 pattern-grid opacity-[0.03]" />

            <Card className="w-full max-w-md border-zinc-200 bg-white/50 backdrop-blur-xl shadow-xl relative z-10">
                <CardContent className="p-10 text-center">
                    {/* Logo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-black/20">
                            <Lock className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-zinc-900 mb-2">Welcome Back</h1>
                        <p className="text-zinc-500">Enter your credentials to access your account</p>
                    </div>

                    {/* Message */}
                    <div className="mb-8 p-6 bg-zinc-50 border border-zinc-100 rounded-xl">
                        <p className="text-zinc-600 leading-relaxed">
                            We&apos;re launching on <span className="font-semibold text-zinc-900">December 31st</span>.
                            Reserve your spot now for just <span className="text-green-600 font-bold">$5</span> (early bird)
                            or <span className="text-zinc-900 font-bold">$9</span> after.
                        </p>
                    </div>

                    {/* CTA */}
                    <Link href="/">
                        <Button className="w-full h-12 bg-black hover:bg-zinc-800 text-white font-semibold shadow-lg shadow-black/10">
                            Join Waitlist
                        </Button>
                    </Link>

                    <p className="text-zinc-400 text-xs mt-6">
                        One-time payment. Lifetime access.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
