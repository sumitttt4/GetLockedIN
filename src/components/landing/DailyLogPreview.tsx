"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Check, Clock, Hash } from "lucide-react";
import { cn } from "@/lib/utils";

export function DailyLogPreview({ className }: { className?: string }) {
    return (
        <Card className={cn("bg-white border-zinc-200 overflow-hidden group", className)}>
            <CardContent className="p-6">
                <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium mb-4">
                    <Hash className="w-4 h-4" />
                    THE LOG
                </div>

                {/* Editor Mockup */}
                <div className="bg-zinc-50 rounded-lg border border-zinc-200 p-4 space-y-3 font-mono text-sm shadow-inner">
                    <div className="flex items-center justify-between text-xs text-zinc-400 border-b border-zinc-200 pb-2">
                        <span>entry_045.md</span>
                        <div className="flex items-center gap-1.5 text-orange-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
                            Live
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-zinc-900">
                            <span className="text-blue-600">#</span> Day 45: Shipping Mode
                        </p>
                        <p className="text-zinc-600">
                            Finally cracked the auth bug. The new viral loop is ready to deploy.
                        </p>
                        <p className="text-zinc-600">
                            &gt; Cleaned up the component<br />
                            &gt; Added OG tags<br />
                            &gt; Locked in for 4h deep work
                        </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-zinc-400">
                            <Clock className="w-3 h-3" />
                            14:20 PM
                        </div>
                        <div className="px-2 py-1 bg-orange-100 border border-orange-200 rounded text-xs text-orange-700 font-bold flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            SHIPPED
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
