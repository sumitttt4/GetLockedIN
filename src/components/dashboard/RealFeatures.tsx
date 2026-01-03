"use client";

import React, { useState } from "react";
import {
    Github,
    CreditCard,
    DollarSign
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createGoal } from "@/app/dashboard/actions";

// --- WIDGET 1: THE INTEGRATIONS HUB (Legacy/Compact) ---
export function IntegrationsHub() {
    return (
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-bold text-lg uppercase mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Integrations
            </h3>
            {/* Logic moved to Main Dashboard Modal */}
            <div className="text-xs text-zinc-500 font-mono">Managed via Dashboard Profile</div>
        </div>
    );
}

// --- WIDGET 2: THE NORTH STAR DIRECTIVE (Goal Wizard) ---
export function NorthStarDirective() {
    const [stake, setStake] = useState("penalty");
    const [currency, setCurrency] = useState("USD");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const currencies = {
        USD: { symbol: "$", rate: 50 },
        EUR: { symbol: "€", rate: 45 },
        GBP: { symbol: "£", rate: 40 },
        INR: { symbol: "₹", rate: 4000 },
    };

    const currentPrice = currencies[currency as keyof typeof currencies];

    async function handleGoalCreation(formData: FormData) {
        setIsLoading(true);
        setMessage(null);

        formData.delete('stakes');

        const result = await createGoal(formData);

        if (result?.error) {
            setMessage({ type: 'error', text: result.error });
        } else if (result?.success) {
            setMessage({ type: 'success', text: result.success });
            // Reset the form
            formRef.current?.reset();
        }

        setIsLoading(false);
    }

    return (
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">
            <div className="space-y-1">
                <h3 className="font-bold text-lg uppercase tracking-wider flex items-center gap-2">
                    <span className="w-2 h-2 bg-black" />
                    New Directive
                </h3>
                <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">// DEFINE_PROTOCOL_GOAL</p>
            </div>

            <form ref={formRef} action={handleGoalCreation} className="space-y-4 flex-1 flex flex-col">
                {/* 1. Title & Description */}
                <div className="space-y-2">
                    <label className="font-mono text-xs font-bold uppercase text-zinc-600 block">
                        Objective
                    </label>
                    <input
                        name="title"
                        type="text"
                        required
                        placeholder="e.g. REACH $10K MRR"
                        className="w-full bg-zinc-50 border-2 border-black p-3 font-mono text-sm font-bold uppercase placeholder:text-zinc-300 focus:outline-none focus:bg-white rounded-none focus:ring-1 focus:ring-black"
                    />
                    <textarea
                        name="description"
                        placeholder="Why is this critical?"
                        rows={2}
                        className="w-full bg-zinc-50 border-2 border-black p-3 font-mono text-xs uppercase placeholder:text-zinc-300 focus:outline-none focus:bg-white rounded-none resize-none"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 2. Target Value */}
                    <div className="space-y-1">
                        <label className="font-mono text-xs font-bold uppercase text-zinc-600 block">Target</label>
                        <div className="flex">
                            <input
                                name="target_value"
                                type="number"
                                placeholder="10000"
                                className="w-full bg-zinc-50 border-2 border-black p-2 font-mono text-sm font-bold uppercase focus:outline-none rounded-none"
                            />
                            <select
                                name="unit"
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                className="bg-white border-2 border-black border-l-0 px-2 font-mono text-xs font-bold"
                            >
                                {Object.keys(currencies).map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* 3. Deadline */}
                    <div className="space-y-1">
                        <label className="font-mono text-xs font-bold uppercase text-zinc-600 block">Deadline</label>
                        <input
                            name="deadline"
                            type="date"
                            required
                            className="w-full bg-zinc-50 border-2 border-black p-2 font-mono text-sm font-bold uppercase focus:outline-none rounded-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* 4. Category */}
                    <div className="space-y-1">
                        <label className="font-mono text-xs font-bold uppercase text-zinc-600 block">Category</label>
                        <select
                            name="category"
                            className="w-full bg-zinc-50 border-2 border-black p-2 font-mono text-xs font-bold uppercase focus:outline-none rounded-none"
                        >
                            <option value="startup">Startup</option>
                            <option value="fitness">Fitness</option>
                            <option value="learning">Learning</option>
                            <option value="personal">Personal</option>
                        </select>
                    </div>

                    {/* 5. Visibility */}
                    <div className="space-y-1">
                        <label className="font-mono text-xs font-bold uppercase text-zinc-600 block">Visibility</label>
                        <div className="flex gap-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="visibility" value="public" defaultChecked className="accent-black" />
                                <span className="text-[10px] font-bold uppercase">Public</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="visibility" value="private" className="accent-black" />
                                <span className="text-[10px] font-bold uppercase">Private</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Feedback Message */}
                {message && (
                    <div className={cn(
                        "p-3 border-2 text-xs font-bold uppercase tracking-wide",
                        message.type === 'success' ? "bg-green-50 border-green-500 text-green-700" : "bg-red-50 border-red-500 text-red-700"
                    )}>
                        {message.text}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-2 w-full bg-black text-white hover:bg-[#00FF00] hover:text-black border-2 border-black py-3 font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {isLoading ? "Initiating..." : (
                        <>INITIATE DIRECTIVE <div className="w-2 h-2 bg-white group-hover:bg-black" /></>
                    )}
                </button>
            </form>
        </div>
    );
}

// --- WIDGET 3: WITNESS LIST ---
export function WitnessList() {
    return (
        <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
            <h3 className="font-bold text-lg uppercase mb-4">Witnesses</h3>
            <div className="flex-1 overflow-y-auto space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-200 rounded-none border border-black" />
                        <div>
                            <div className="text-xs font-bold uppercase">@ALEX_DEV</div>
                            <div className="text-[10px] text-zinc-500 font-mono">Verified 2m ago</div>
                        </div>
                    </div>
                ))}
            </div>
            <button className="mt-4 w-full border-2 border-black border-dashed py-2 text-xs font-bold uppercase hover:bg-black hover:text-white transition-all">
                Invite Witness
            </button>
        </div>
    );
}

// --- MAIN GRID EXPORT ---
export function RealFeaturesGrid() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-1">
                <IntegrationsHub />
            </div>
            <div className="lg:col-span-1">
                <NorthStarDirective />
            </div>
            <div className="lg:col-span-1 h-full">
                <WitnessList />
            </div>
        </div>
    );
}
