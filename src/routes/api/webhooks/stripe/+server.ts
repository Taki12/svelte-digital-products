import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import stripe from '$lib/server/stripe';
import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import {
	handleCheckoutCompleted,
	handlePaymentSucceeded,
	handlePaymentFailed,
	handleSubscriptionCreated,
	handleSubscriptionUpdated,
	handleSubscriptionDeleted,
	handleInvoicePaid,
	handleInvoicePaymentFailed,
	handleCustomerCreated,
	handleCustomerUpdated
} from '$lib/server/webhooks/stripe';
import type Stripe from 'stripe';

// Track processed events to ensure idempotency
const processedEvents = new Set<string>();

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('stripe-signature');

	if (!signature) {
		throw error(400, 'Missing stripe-signature header');
	}

	if (!STRIPE_WEBHOOK_SECRET) {
		console.error('STRIPE_WEBHOOK_SECRET is not configured');
		throw error(500, 'Webhook secret not configured');
	}

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error('Webhook signature verification failed:', err);
		throw error(400, 'Invalid signature');
	}

	// Check for duplicate events (idempotency)
	if (processedEvents.has(event.id)) {
		console.log('Duplicate event ignored:', event.id);
		return json({ received: true });
	}

	// Mark event as processed
	processedEvents.add(event.id);

	// Clean up old events (keep last 1000)
	if (processedEvents.size > 1000) {
		const eventsArray = Array.from(processedEvents);
		eventsArray.slice(0, 500).forEach((id) => processedEvents.delete(id));
	}

	console.log('Processing webhook event:', event.type, event.id);

	try {
		switch (event.type) {
			case 'checkout.session.completed':
				await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
				break;

			case 'payment_intent.succeeded':
				await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
				break;

			case 'payment_intent.payment_failed':
				await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
				break;

			case 'customer.subscription.created':
				await handleSubscriptionCreated(event.data.object as Stripe.Subscription);
				break;

			case 'customer.subscription.updated':
				await handleSubscriptionUpdated(event.data.object as Stripe.Subscription);
				break;

			case 'customer.subscription.deleted':
				await handleSubscriptionDeleted(event.data.object as Stripe.Subscription);
				break;

			case 'invoice.paid':
				await handleInvoicePaid(event.data.object as Stripe.Invoice);
				break;

			case 'invoice.payment_failed':
				await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice);
				break;

			case 'customer.created':
				await handleCustomerCreated(event.data.object as Stripe.Customer);
				break;

			case 'customer.updated':
				await handleCustomerUpdated(event.data.object as Stripe.Customer);
				break;

			default:
				console.log('Unhandled event type:', event.type);
		}
	} catch (err) {
		console.error('Error handling webhook event:', err);
		// Return 200 anyway to prevent Stripe from retrying
		// Log the error for investigation
	}

	return json({ received: true });
};
