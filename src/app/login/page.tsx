"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Terminal, ArrowRight, Github, Mail } from "lucide-react";
import { loginWithMagicLink, loginWithOAuth } from "./actions";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleMagicLink(formData: FormData) {
        setIsLoading(true);
        setMessage(null);

        const result = await loginWithMagicLink(formData);

        if (result?.error) {
            setMessage({ type: 'error', text: result.error });
        } else if (result?.success) {
            setMessage({ type: 'success', text: result.success });
        }

        setIsLoading(false);
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Mesh */}
            <div className="absolute inset-0 pattern-grid opacity-[0.05]" />

            <div className="w-full max-w-md relative z-10">

                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-6">
                        <span className="w-10 h-10 bg-black text-white flex items-center justify-center border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                            <Terminal className="w-6 h-6" />
                        </span>
                        <span className="font-black text-2xl tracking-[-0.1em] uppercase text-zinc-900">
                            GetLockedIN
                        </span>
                    </Link>
                    <h1 className="text-3xl font-black uppercase tracking-tighter text-black mb-2">
                        System Access
                    </h1>
                    <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                        // SECURE_LOGIN_PROTOCOL
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {/* Social Login Buttons - COMMENTED FOR LAUNCH
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button
                            onClick={() => loginWithOAuth('github')}
                            className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 border-2 border-black p-3 font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            <Github className="w-4 h-4" /> GitHub
                        </button>
                        <button
                            onClick={() => loginWithOAuth('google')}
                            className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 border-2 border-black p-3 font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-zinc-500 font-mono">Or continue with Magic Link</span>
                        </div>
                    </div>
                    */}

                    <form action={handleMagicLink} className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="font-mono text-xs font-bold uppercase text-zinc-500">
                                Operator Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-zinc-50 border-2 border-black p-3 font-mono text-sm focus:outline-none focus:bg-[#00FF00]/10 placeholder:text-zinc-300 rounded-none transition-colors"
                                required
                            />
                        </div>

                        {/* Status Message */}
                        {message && (
                            <div className={cn(
                                "p-3 border-2 text-xs font-bold uppercase tracking-wide",
                                message.type === 'success' ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
                            )}>
                                {message.text}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white p-4 font-bold uppercase tracking-widest hover:bg-[#00FF00] hover:text-black border-2 border-transparent hover:border-black transition-all active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-none group"
                        >
                            {isLoading ? (
                                <span className="animate-pulse">Sending Link...</span>
                            ) : (
                                <>
                                    <Mail className="w-4 h-4" /> Send Magic Link
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 pt-6 border-t-2 border-zinc-100 flex flex-col gap-3 text-center">
                        <p className="font-mono text-xs text-zinc-400">
                            Don't have a badge?
                        </p>
                        <Link
                            href="/checkout"
                            className="text-xs font-bold uppercase tracking-wider text-black hover:text-[#00aa00] hover:underline decoration-2 underline-offset-4"
                        >
                            Request Access Protocol {'->'}
                        </Link>
                    </div>
                </div>

                {/* Status Indicator */}
                <div className="mt-8 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200">
                        <span className="w-2 h-2 bg-green-500 animate-pulse rounded-none"></span>
                        <span className="font-mono text-[10px] font-bold uppercase text-zinc-500">
                            Mainframe Online
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}
