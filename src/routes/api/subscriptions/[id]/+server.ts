import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import {
	retrieveSubscription,
	updateSubscription,
	cancelSubscription,
	resumeSubscription
} from '$lib/server/stripe/subscriptions';

export const GET: RequestHandler = async ({ params }) => {
	try {
		const subscription = await retrieveSubscription(params.id);

		return json({
			id: subscription.id,
			status: subscription.status,
			currentPeriodStart: new Date(subscription.current_period_start * 1000).toISOString(),
			currentPeriodEnd: new Date(subscription.current_period_end * 1000).toISOString(),
			cancelAtPeriodEnd: subscription.cancel_at_period_end,
			canceledAt: subscription.canceled_at
				? new Date(subscription.canceled_at * 1000).toISOString()
				: null,
			priceId: subscription.items.data[0]?.price.id
		});
	} catch (err) {
		console.error('Retrieve subscription error:', err);
		throw error(500, 'Failed to retrieve subscription');
	}
};

export const PATCH: RequestHandler = async ({ params, request }) => {
	try {
		const body = await request.json();
		const { priceId, cancelAtPeriodEnd } = body;

		const subscription = await updateSubscription(params.id, {
			priceId,
			cancelAtPeriodEnd
		});

		return json({
			id: subscription.id,
			status: subscription.status,
			cancelAtPeriodEnd: subscription.cancel_at_period_end
		});
	} catch (err) {
		console.error('Update subscription error:', err);
		throw error(500, 'Failed to update subscription');
	}
};

export const DELETE: RequestHandler = async ({ params, url }) => {
	try {
		const immediately = url.searchParams.get('immediately') === 'true';

		const subscription = await cancelSubscription(params.id, immediately);

		return json({
			id: subscription.id,
			status: subscription.status,
			cancelAtPeriodEnd: subscription.cancel_at_period_end
		});
	} catch (err) {
		console.error('Cancel subscription error:', err);
		throw error(500, 'Failed to cancel subscription');
	}
};

export const PUT: RequestHandler = async ({ params }) => {
	try {
		// Resume a cancelled subscription
		const subscription = await resumeSubscription(params.id);

		return json({
			id: subscription.id,
			status: subscription.status,
			cancelAtPeriodEnd: subscription.cancel_at_period_end
		});
	} catch (err) {
		console.error('Resume subscription error:', err);
		throw error(500, 'Failed to resume subscription');
	}
};
