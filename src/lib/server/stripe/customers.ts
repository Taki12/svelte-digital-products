import stripe from '../stripe';

export interface CreateCustomerOptions {
	email: string;
	name?: string;
	metadata?: Record<string, string>;
}

export async function createCustomer(options: CreateCustomerOptions) {
	const { email, name, metadata } = options;

	return stripe.customers.create({
		email,
		name,
		metadata
	});
}

export async function retrieveCustomer(customerId: string) {
	return stripe.customers.retrieve(customerId, {
		expand: ['subscriptions', 'default_source']
	});
}

export async function updateCustomer(
	customerId: string,
	options: {
		email?: string;
		name?: string;
		metadata?: Record<string, string>;
		defaultPaymentMethod?: string;
	}
) {
	return stripe.customers.update(customerId, {
		email: options.email,
		name: options.name,
		metadata: options.metadata,
		invoice_settings: options.defaultPaymentMethod
			? { default_payment_method: options.defaultPaymentMethod }
			: undefined
	});
}

export async function deleteCustomer(customerId: string) {
	return stripe.customers.del(customerId);
}

export async function findCustomerByEmail(email: string) {
	const customers = await stripe.customers.list({
		email,
		limit: 1
	});

	return customers.data[0] || null;
}

export async function getOrCreateCustomer(email: string, name?: string) {
	const existing = await findCustomerByEmail(email);

	if (existing) {
		return existing;
	}

	return createCustomer({ email, name });
}

export async function listPaymentMethods(customerId: string) {
	return stripe.paymentMethods.list({
		customer: customerId,
		type: 'card'
	});
}

export async function attachPaymentMethod(customerId: string, paymentMethodId: string) {
	return stripe.paymentMethods.attach(paymentMethodId, {
		customer: customerId
	});
}

export async function detachPaymentMethod(paymentMethodId: string) {
	return stripe.paymentMethods.detach(paymentMethodId);
}
