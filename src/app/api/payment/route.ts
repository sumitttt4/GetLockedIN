import { NextResponse } from 'next/server';
import DodoPayments from 'dodopayments';

export async function POST(request: Request) {
    try {
        const apiKey = process.env.DODO_API_KEY;
        if (!apiKey) {
            console.error('Missing DODO_API_KEY');
            return NextResponse.json(
                { error: 'Server misconfiguration: Missing API Key' },
                { status: 500 }
            );
        }

        const client = new DodoPayments({
            bearerToken: apiKey,
            environment: 'test_mode',
        });

        const { email, plan } = await request.json();

        const amount = plan === 'early' ? 500 : 900; // $5.00 or $9.00

        const payment = await client.payments.create({
            billing: {
                city: 'New York',
                country: 'US',
                state: 'NY',
                street: '123 Wall St',
                zipcode: '10005'
            },


            customer: {
                email: email,
                name: email.split('@')[0],
            },
            product_cart: [{
                product_id: plan === 'early' ? 'p_early' : 'p_regular',
                quantity: 1,
                amount: amount
            }],
            return_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        });

        return NextResponse.json({ url: payment.payment_link });
    } catch (error) {
        console.error('Payment Error:', error);
        return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
    }
}
