import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Terminal, Lock, ShieldCheck, Check } from "lucide-react";
import CheckoutForm from "./checkout-client";

export default async function CheckoutPage() {
    const supabase = await createClient();

    // 1. Check Auth
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        redirect("/login");
    }

    // 2. Check Payment Status
    const isAdmin = user.email?.toLowerCase() === 'sumitsharma9128@gmail.com';

    if (isAdmin) {
        redirect("/dashboard");
    }

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('has_paid, username')
        .eq('id', user.id)
        .single();

    // Debug help: if column is missing, we still want the page to render or redirect
    if (profile?.has_paid) {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
            {/* Background Mesh */}
            <div className="absolute inset-0 pattern-grid opacity-[0.05] pointer-events-none" />

            <div className="w-full max-w-lg bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10">

                {/* Header */}
                <div className="bg-black text-white p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5" />
                        <span className="font-bold font-mono tracking-wider">INVOICE #001</span>
                    </div>
                    <Lock className="w-4 h-4 text-[#00FF00]" />
                </div>

                <div className="p-8 space-y-8">

                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Day One Access</h1>
                        <p className="text-zinc-500 font-mono text-xs uppercase">Pending Payment for @{profile?.username || 'USER'}</p>
                    </div>

                    {/* Line Items */}
                    <div className="border-t-2 border-b-2 border-dashed border-zinc-200 py-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <div className="font-bold uppercase text-sm">Lifetime Operator Access</div>
                                <div className="text-xs text-zinc-500 mt-1 max-w-[200px]">Includes dashboard, unlimited goals, and 1v1 battles.</div>
                            </div>
                            <div className="font-mono font-bold">$9.00</div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-zinc-400">
                            <div>Taxes & Fees</div>
                            <div className="font-mono">$0.00</div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center">
                        <div className="font-black uppercase tracking-widest text-lg">Total Due</div>
                        <div className="text-4xl font-black tracking-tighter">$9.00</div>
                    </div>

                    {/* Benefits Checklist */}
                    <div className="bg-zinc-50 p-4 border border-zinc-200 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-600">
                            <Check className="w-4 h-4 text-green-600" /> Instant Access
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-600">
                            <ShieldCheck className="w-4 h-4 text-green-600" /> Secure Encryption
                        </div>
                    </div>

                    {/* Client Component for Action */}
                    <CheckoutForm />

                    <div className="text-[10px] text-zinc-400 text-center leading-relaxed">
                        By proceeding, you agree to the Terms of Service. <br />
                        Payment is non-refundable.
                    </div>
                </div>
            </div>
        </div>
    );
}
