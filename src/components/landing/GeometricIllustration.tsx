"use client";

import { motion } from "framer-motion";

export function GeometricIllustration() {
    return (
        <div className="relative w-48 h-48 mx-auto">
            {/* Base Circle */}
            <motion.div
                className="absolute inset-0 bg-orange-100/50 rounded-full blur-xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Isometric Box 1 (Center) */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white border border-zinc-200 rounded-2xl shadow-lg z-10 flex items-center justify-center"
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-8 h-8 rounded-full border-4 border-orange-500 border-t-transparent animate-spin" />
            </motion.div>

            {/* Floating Elements */}
            <motion.div
                className="absolute top-0 right-0 w-12 h-12 bg-zinc-50 border border-zinc-100 rounded-xl shadow-sm z-0"
                animate={{ y: [10, -10, 10], rotate: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
                className="absolute bottom-4 left-4 w-10 h-10 bg-orange-50 border border-orange-100 rounded-lg shadow-sm z-20"
                animate={{ y: [-8, 8, -8], rotate: [0, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
        </div>
    );
}
