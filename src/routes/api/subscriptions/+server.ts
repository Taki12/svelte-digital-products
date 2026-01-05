import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { createSubscription, listSubscriptions } from '$lib/server/stripe/subscriptions';
import { getOrCreateCustomer } from '$lib/server/stripe/customers';

export const POST: RequestHandler = async ({ request, locals }) => {
	try {
		const body = await request.json();
		const { priceId, email, name, trialDays } = body;

		if (!priceId) {
			throw error(400, 'Price ID is required');
		}

		if (!email) {
			throw error(400, 'Email is required');
		}

		// Get or create customer
		const customer = await getOrCreateCustomer(email, name);

		// Create subscription
		const subscription = await createSubscription({
			customerId: customer.id,
			priceId,
			trialDays,
			metadata: {
				email
			}
		});

		// Get client secret for payment
		const latestInvoice = subscription.latest_invoice;
		let clientSecret: string | null = null;

		if (latestInvoice && typeof latestInvoice !== 'string') {
			const paymentIntent = latestInvoice.payment_intent;
			if (paymentIntent && typeof paymentIntent !== 'string') {
				clientSecret = paymentIntent.client_secret;
			}
		}

		return json({
			subscriptionId: subscription.id,
			customerId: customer.id,
			clientSecret,
			status: subscription.status
		});
	} catch (err) {
		console.error('Create subscription error:', err);
		throw error(500, 'Failed to create subscription');
	}
};

export const GET: RequestHandler = async ({ url }) => {
	try {
		const customerId = url.searchParams.get('customer_id');

		if (!customerId) {
			throw error(400, 'Customer ID is required');
		}

		const subscriptions = await listSubscriptions(customerId);

		return json({
			subscriptions: subscriptions.data.map((sub) => ({
				id: sub.id,
				status: sub.status,
				currentPeriodStart: new Date(sub.current_period_start * 1000).toISOString(),
				currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString(),
				cancelAtPeriodEnd: sub.cancel_at_period_end,
				priceId: sub.items.data[0]?.price.id
			}))
		});
	} catch (err) {
		console.error('List subscriptions error:', err);
		throw error(500, 'Failed to list subscriptions');
	}
};
