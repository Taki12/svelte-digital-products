<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Loader2, CreditCard } from 'lucide-svelte';
	import { loadStripe } from '@stripe/stripe-js';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { getCartItemsForCheckout } from '$lib/stores/cart';

	interface Props {
		email?: string;
		mode?: 'payment' | 'subscription';
		class?: string;
		disabled?: boolean;
	}

	let { email, mode = 'payment', class: className = '', disabled = false }: Props = $props();

	let loading = $state(false);
	let error = $state('');

	async function handleCheckout() {
		loading = true;
		error = '';

		try {
			const items = getCartItemsForCheckout();

			if (items.length === 0) {
				error = 'Your cart is empty';
				return;
			}

			const response = await fetch('/api/checkout', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					items,
					email,
					mode
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Failed to create checkout session';
				return;
			}

			// Redirect to Stripe Checkout
			if (data.url) {
				window.location.href = data.url;
			} else if (data.sessionId) {
				const stripe = await loadStripe(PUBLIC_STRIPE_KEY);
				if (stripe) {
					const { error: stripeError } = await stripe.redirectToCheckout({
						sessionId: data.sessionId
					});
					if (stripeError) {
						error = stripeError.message || 'Checkout failed';
					}
				}
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
			console.error('Checkout error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<div class="space-y-2">
	<Button
		class="w-full {className}"
		onclick={handleCheckout}
		disabled={loading || disabled}
	>
		{#if loading}
			<Loader2 class="h-4 w-4 mr-2 animate-spin" />
			Processing...
		{:else}
			<CreditCard class="h-4 w-4 mr-2" />
			Proceed to Checkout
		{/if}
	</Button>

	{#if error}
		<p class="text-sm text-destructive text-center">{error}</p>
	{/if}
</div>
