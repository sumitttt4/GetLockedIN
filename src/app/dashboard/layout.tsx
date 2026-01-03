import { createClient } from "@/utils/supabase/server";
import { DashboardLayoutClient } from "./layout.client";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    // DEV MODE: Bypass for UI development (REMOVE BEFORE PRODUCTION)
    const DEV_BYPASS = process.env.NODE_ENV === 'development' && process.env.BYPASS_AUTH === 'true';

    // Provide defaults if user not found (though middleware should catch this)
    if (!user && !DEV_BYPASS) {
        redirect('/login');
    }

    const userData = DEV_BYPASS ? {
        email: 'dev@example.com',
        id: 'dev-user-id'
    } : {
        email: user.email,
        id: user.id
    };

    const isAdmin = user?.email === 'sumitsharma9128@gmail.com';

    if (user && !isAdmin && !DEV_BYPASS) {
        // Enforce Payment Gate
        const { data: profile } = await supabase
            .from('profiles')
            .select('has_paid')
            .eq('id', user.id)
            .single();

        // Only redirect if we explicitly know they haven't paid (or if query fails but they aren't admin)
        if (profile && !profile.has_paid) {
            redirect('/checkout');
        }
    }

    return (
        <DashboardLayoutClient user={userData}>
            {children}
        </DashboardLayoutClient>
    );
}
