import stripe from '../stripe';

export async function listProducts(options?: { active?: boolean; limit?: number }) {
	return stripe.products.list({
		active: options?.active ?? true,
		limit: options?.limit ?? 100,
		expand: ['data.default_price']
	});
}

export async function retrieveProduct(productId: string) {
	return stripe.products.retrieve(productId, {
		expand: ['default_price']
	});
}

export async function listPrices(options?: { productId?: string; active?: boolean; type?: 'one_time' | 'recurring' }) {
	return stripe.prices.list({
		product: options?.productId,
		active: options?.active ?? true,
		type: options?.type,
		expand: ['data.product'],
		limit: 100
	});
}

export async function retrievePrice(priceId: string) {
	return stripe.prices.retrieve(priceId, {
		expand: ['product']
	});
}

export interface ProductWithPrices {
	id: string;
	name: string;
	description: string | null;
	image: string | null;
	metadata: Record<string, string>;
	prices: {
		id: string;
		amount: number;
		currency: string;
		interval?: string;
		intervalCount?: number;
		type: 'one_time' | 'recurring';
	}[];
}

export async function getProductsWithPrices(): Promise<ProductWithPrices[]> {
	const [products, prices] = await Promise.all([
		stripe.products.list({ active: true, limit: 100 }),
		stripe.prices.list({ active: true, limit: 100 })
	]);

	const pricesByProduct = new Map<string, typeof prices.data>();

	for (const price of prices.data) {
		const productId = typeof price.product === 'string' ? price.product : price.product.id;
		const existing = pricesByProduct.get(productId) || [];
		existing.push(price);
		pricesByProduct.set(productId, existing);
	}

	return products.data.map((product) => ({
		id: product.id,
		name: product.name,
		description: product.description,
		image: product.images?.[0] || null,
		metadata: product.metadata,
		prices: (pricesByProduct.get(product.id) || []).map((price) => ({
			id: price.id,
			amount: price.unit_amount ? price.unit_amount / 100 : 0,
			currency: price.currency,
			interval: price.recurring?.interval,
			intervalCount: price.recurring?.interval_count,
			type: price.type
		}))
	}));
}
