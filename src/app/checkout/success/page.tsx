import Link from 'next/link';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 border border-green-200">
                <Check className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-black text-zinc-900 mb-2">Payment Successful</h1>
            <p className="text-zinc-500 mb-8 max-w-md">
                Thank you for your purchase. You are now officially LockedIn for lifetime access.
            </p>
            <Link href="/">
                <Button className="bg-black hover:bg-zinc-800 text-white font-semibold px-8 h-12 shadow-md">
                    Return to Dashboard
                </Button>
            </Link>
        </div>
    );
}
