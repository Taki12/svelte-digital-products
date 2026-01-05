import stripe from '../stripe';

export interface CreateSubscriptionOptions {
	customerId: string;
	priceId: string;
	metadata?: Record<string, string>;
	trialDays?: number;
}

export async function createSubscription(options: CreateSubscriptionOptions) {
	const { customerId, priceId, metadata, trialDays } = options;

	const subscription = await stripe.subscriptions.create({
		customer: customerId,
		items: [{ price: priceId }],
		payment_behavior: 'default_incomplete',
		payment_settings: {
			save_default_payment_method: 'on_subscription'
		},
		expand: ['latest_invoice.payment_intent'],
		metadata,
		trial_period_days: trialDays
	});

	return subscription;
}

export async function retrieveSubscription(subscriptionId: string) {
	return stripe.subscriptions.retrieve(subscriptionId, {
		expand: ['default_payment_method', 'latest_invoice']
	});
}

export async function updateSubscription(
	subscriptionId: string,
	options: {
		priceId?: string;
		metadata?: Record<string, string>;
		cancelAtPeriodEnd?: boolean;
	}
) {
	const updateData: Stripe.SubscriptionUpdateParams = {};

	if (options.priceId) {
		const subscription = await stripe.subscriptions.retrieve(subscriptionId);
		updateData.items = [
			{
				id: subscription.items.data[0].id,
				price: options.priceId
			}
		];
		updateData.proration_behavior = 'create_prorations';
	}

	if (options.metadata) {
		updateData.metadata = options.metadata;
	}

	if (options.cancelAtPeriodEnd !== undefined) {
		updateData.cancel_at_period_end = options.cancelAtPeriodEnd;
	}

	return stripe.subscriptions.update(subscriptionId, updateData);
}

export async function cancelSubscription(subscriptionId: string, immediately = false) {
	if (immediately) {
		return stripe.subscriptions.cancel(subscriptionId);
	}

	return stripe.subscriptions.update(subscriptionId, {
		cancel_at_period_end: true
	});
}

export async function resumeSubscription(subscriptionId: string) {
	return stripe.subscriptions.update(subscriptionId, {
		cancel_at_period_end: false
	});
}

export async function listSubscriptions(customerId: string) {
	return stripe.subscriptions.list({
		customer: customerId,
		status: 'all',
		expand: ['data.default_payment_method']
	});
}

import type Stripe from 'stripe';
