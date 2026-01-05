import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createPaymentIntent, retrievePaymentIntent } from '$lib/server/stripe/payments';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { amount, currency, customerId, metadata, description, receiptEmail } = body;

		if (!amount || amount <= 0) {
			throw error(400, 'Valid amount is required');
		}

		const paymentIntent = await createPaymentIntent({
			amount,
			currency,
			customerId,
			metadata,
			description,
			receiptEmail
		});

		return json({
			clientSecret: paymentIntent.client_secret,
			paymentIntentId: paymentIntent.id
		});
	} catch (err) {
		console.error('Payment intent error:', err);
		throw error(500, 'Failed to create payment intent');
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const paymentIntentId = url.searchParams.get('payment_intent_id');

		if (!paymentIntentId) {
			throw error(400, 'Payment intent ID is required');
		}

		const paymentIntent = await retrievePaymentIntent(paymentIntentId);

		return json({
			id: paymentIntent.id,
			status: paymentIntent.status,
			amount: paymentIntent.amount / 100,
			currency: paymentIntent.currency
		});
	} catch (err) {
		console.error('Retrieve payment intent error:', err);
		throw error(500, 'Failed to retrieve payment intent');
	}
};
