import { writable, derived, get } from 'svelte/store';
import { browser } from '$app/environment';

export interface CartItem {
	id: number | string;
	name: string;
	price: number;
	quantity: number;
	image?: string;
	description?: string;
	variant?: string;
	size?: string;
	color?: string;
	originalPrice?: number;
}

interface CartState {
	items: CartItem[];
	promoCode: string | null;
	promoDiscount: number;
}

const CART_STORAGE_KEY = 'cart';

function getInitialState(): CartState {
	if (browser) {
		const stored = localStorage.getItem(CART_STORAGE_KEY);
		if (stored) {
			try {
				return JSON.parse(stored);
			} catch {
				// Invalid JSON, use default
			}
		}
	}
	return {
		items: [],
		promoCode: null,
		promoDiscount: 0
	};
}

function createCartStore() {
	const { subscribe, set, update } = writable<CartState>(getInitialState());

	// Persist to localStorage on changes
	if (browser) {
		subscribe((state) => {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
		});
	}

	return {
		subscribe,

		addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
			update((state) => {
				const existingIndex = state.items.findIndex(
					(i) =>
						i.id === item.id &&
						i.variant === item.variant &&
						i.size === item.size &&
						i.color === item.color
				);

				if (existingIndex >= 0) {
					const newItems = [...state.items];
					newItems[existingIndex].quantity += item.quantity || 1;
					return { ...state, items: newItems };
				}

				return {
					...state,
					items: [...state.items, { ...item, quantity: item.quantity || 1 }]
				};
			});
		},

		removeItem: (id: number | string, variant?: string, size?: string, color?: string) => {
			update((state) => ({
				...state,
				items: state.items.filter(
					(item) =>
						!(
							item.id === id &&
							item.variant === variant &&
							item.size === size &&
							item.color === color
						)
				)
			}));
		},

		updateQuantity: (
			id: number | string,
			quantity: number,
			variant?: string,
			size?: string,
			color?: string
		) => {
			update((state) => {
				if (quantity <= 0) {
					return {
						...state,
						items: state.items.filter(
							(item) =>
								!(
									item.id === id &&
									item.variant === variant &&
									item.size === size &&
									item.color === color
								)
						)
					};
				}

				return {
					...state,
					items: state.items.map((item) =>
						item.id === id &&
						item.variant === variant &&
						item.size === size &&
						item.color === color
							? { ...item, quantity: Math.min(quantity, 99) }
							: item
					)
				};
			});
		},

		applyPromoCode: (code: string, discountPercent: number) => {
			update((state) => ({
				...state,
				promoCode: code,
				promoDiscount: discountPercent
			}));
		},

		removePromoCode: () => {
			update((state) => ({
				...state,
				promoCode: null,
				promoDiscount: 0
			}));
		},

		clear: () => {
			set({
				items: [],
				promoCode: null,
				promoDiscount: 0
			});
		}
	};
}

export const cart = createCartStore();

// Derived stores for computed values
export const cartItems = derived(cart, ($cart) => $cart.items);

export const cartCount = derived(cart, ($cart) =>
	$cart.items.reduce((sum, item) => sum + item.quantity, 0)
);

export const cartSubtotal = derived(cart, ($cart) =>
	$cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const cartDiscount = derived([cart, cartSubtotal], ([$cart, $subtotal]) =>
	$cart.promoDiscount > 0 ? ($subtotal * $cart.promoDiscount) / 100 : 0
);

export const cartTotal = derived(
	[cartSubtotal, cartDiscount],
	([$subtotal, $discount]) => $subtotal - $discount
);

// Helper function to get cart items for checkout
export function getCartItemsForCheckout(): CartItem[] {
	return get(cart).items;
}
