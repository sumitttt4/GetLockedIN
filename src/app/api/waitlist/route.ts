
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const resendKey = process.env.RESEND_API_KEY;
        if (!resendKey) {
            console.error('RESEND_API_KEY is missing');
            return NextResponse.json({ error: 'Server misconfiguration: Missing Email Key' }, { status: 500 });
        }

        const resend = new Resend(resendKey);
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Send confirmation email
        const { data, error } = await resend.emails.send({
            from: 'GetLockedIN <hello@getlockedin.live>',
            to: email,
            subject: 'You are on the list! 🚀',
            html: `
                <div style="font-family: sans-serif; color: #333;">
                    <h1>You're LockedIn.</h1>
                    <p>Thanks for joining the waitlist for LockedIn.</p>
                    <p>We are launching on <strong>January 1st, 2026</strong>.</p>
                    <p>We'll notify you when spots open up for the Early Bird plan ($5).</p>
                    <br/>
                    <p>Stay hard,</p>
                    <p>The LockedIn Team</p>
                </div>
            `
        });

        if (error) {
            console.error('Resend Error:', error);
            // Don't fail the request if email fails, just log it.
            // But for now, let's return error to debug.
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        console.error('Waitlist API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
