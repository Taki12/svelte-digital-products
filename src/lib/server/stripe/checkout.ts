import stripe from '../stripe';
import type { CartItem } from '$lib/stores/cart';

export interface CheckoutSessionOptions {
	items: CartItem[];
	customerEmail?: string;
	successUrl: string;
	cancelUrl: string;
	metadata?: Record<string, string>;
	mode?: 'payment' | 'subscription';
}

export async function createCheckoutSession(options: CheckoutSessionOptions) {
	const { items, customerEmail, successUrl, cancelUrl, metadata, mode = 'payment' } = options;

	const lineItems = items.map((item) => ({
		price_data: {
			currency: 'usd',
			product_data: {
				name: item.name,
				images: item.image ? [item.image] : undefined,
				description: item.description,
				metadata: {
					productId: item.id.toString()
				}
			},
			unit_amount: Math.round(item.price * 100) // Convert to cents
		},
		quantity: item.quantity
	}));

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		line_items: lineItems,
		mode,
		customer_email: customerEmail,
		success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: cancelUrl,
		metadata: {
			...metadata,
			orderId: crypto.randomUUID()
		},
		shipping_address_collection: {
			allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR']
		},
		billing_address_collection: 'required'
	});

	return session;
}

export async function retrieveCheckoutSession(sessionId: string) {
	return stripe.checkout.sessions.retrieve(sessionId, {
		expand: ['line_items', 'customer', 'payment_intent']
	});
}

export async function expireCheckoutSession(sessionId: string) {
	return stripe.checkout.sessions.expire(sessionId);
}
