"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: "Features", href: "#features" },
        { name: "How It Works", href: "#how-it-works" },
        { name: "Pricing", href: "#pricing" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full bg-white border-b border-zinc-200">
            <div className="max-w-6xl mx-auto px-4 flex h-14 items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-lg font-semibold text-zinc-900">
                    GetLockedIN
                </Link>

                {/* Center Nav Links - Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Side - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/login" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors">
                        Sign In
                    </Link>
                    <Button asChild size="sm" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-white px-4">
                        <Link href="/login">Join Waitlist</Link>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-zinc-600"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-4 space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block text-sm text-zinc-600 py-2"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-2 flex flex-col gap-2">
                        <Link href="/login" className="text-sm text-zinc-600 py-2" onClick={() => setMobileMenuOpen(false)}>
                            Sign In
                        </Link>
                        <Button asChild className="w-full rounded-full bg-emerald-500 hover:bg-emerald-600 text-white">
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Join Waitlist</Link>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
