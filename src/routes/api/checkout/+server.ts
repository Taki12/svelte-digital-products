import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createCheckoutSession, retrieveCheckoutSession } from '$lib/server/stripe/checkout';
import { PUBLIC_APP_URL } from '$env/static/public';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { items, email, mode = 'payment' } = body;

		if (!items || !Array.isArray(items) || items.length === 0) {
			throw error(400, 'Items are required');
		}

		const session = await createCheckoutSession({
			items,
			customerEmail: email,
			successUrl: `${PUBLIC_APP_URL}/success`,
			cancelUrl: `${PUBLIC_APP_URL}/checkout`,
			mode
		});

		return json({
			sessionId: session.id,
			url: session.url
		});
	} catch (err) {
		console.error('Checkout session error:', err);
		throw error(500, 'Failed to create checkout session');
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const sessionId = url.searchParams.get('session_id');

		if (!sessionId) {
			throw error(400, 'Session ID is required');
		}

		const session = await retrieveCheckoutSession(sessionId);

		return json({
			id: session.id,
			status: session.status,
			paymentStatus: session.payment_status,
			customerEmail: session.customer_details?.email,
			amountTotal: session.amount_total ? session.amount_total / 100 : 0,
			currency: session.currency
		});
	} catch (err) {
		console.error('Retrieve session error:', err);
		throw error(500, 'Failed to retrieve checkout session');
	}
};
