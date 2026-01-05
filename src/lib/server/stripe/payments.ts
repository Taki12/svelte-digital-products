import stripe from '../stripe';

export interface PaymentIntentOptions {
	amount: number; // in dollars
	currency?: string;
	customerId?: string;
	metadata?: Record<string, string>;
	description?: string;
	receiptEmail?: string;
}

export async function createPaymentIntent(options: PaymentIntentOptions) {
	const { amount, currency = 'usd', customerId, metadata, description, receiptEmail } = options;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: Math.round(amount * 100), // Convert to cents
		currency,
		customer: customerId,
		metadata,
		description,
		receipt_email: receiptEmail,
		automatic_payment_methods: {
			enabled: true
		}
	});

	return paymentIntent;
}

export async function retrievePaymentIntent(paymentIntentId: string) {
	return stripe.paymentIntents.retrieve(paymentIntentId);
}

export async function confirmPaymentIntent(paymentIntentId: string, paymentMethodId: string) {
	return stripe.paymentIntents.confirm(paymentIntentId, {
		payment_method: paymentMethodId
	});
}

export async function cancelPaymentIntent(paymentIntentId: string) {
	return stripe.paymentIntents.cancel(paymentIntentId);
}

export async function capturePaymentIntent(paymentIntentId: string) {
	return stripe.paymentIntents.capture(paymentIntentId);
}
