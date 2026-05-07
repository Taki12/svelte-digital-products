import Stripe from 'stripe';

function getStripe(): Stripe {
	const key = process.env.STRIPE_SECRET_KEY;
	if (!key) {
		throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
	}
	return new Stripe(key, { apiVersion: '2024-12-18.acacia' });
}

let _stripe: Stripe | null = null;

export const stripe = new Proxy({} as Stripe, {
	get(_target, prop) {
		if (!_stripe) _stripe = getStripe();
		return (_stripe as unknown as Record<string | symbol, unknown>)[prop];
	}
});

export default stripe;
