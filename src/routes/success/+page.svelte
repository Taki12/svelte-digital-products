<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { CheckCircle, Package, ArrowRight, Loader2 } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { cart } from '$lib/stores/cart';

	let loading = $state(true);
	let orderDetails = $state<{
		id: string;
		email: string;
		amount: number;
		currency: string;
	} | null>(null);
	let error = $state('');

	onMount(async () => {
		const sessionId = $page.url.searchParams.get('session_id');

		if (!sessionId) {
			loading = false;
			return;
		}

		try {
			const response = await fetch(`/api/checkout?session_id=${sessionId}`);
			const data = await response.json();

			if (response.ok) {
				orderDetails = {
					id: data.id,
					email: data.customerEmail,
					amount: data.amountTotal,
					currency: data.currency?.toUpperCase() || 'USD'
				};

				// Clear cart after successful order
				cart.clear();
			} else {
				error = data.message || 'Failed to retrieve order details';
			}
		} catch (err) {
			error = 'Failed to load order details';
			console.error('Error:', err);
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Order Confirmed</title>
</svelte:head>

<div class="min-h-screen bg-background flex items-center justify-center px-4">
	<div class="max-w-md w-full text-center space-y-6">
		{#if loading}
			<div class="flex flex-col items-center gap-4">
				<Loader2 class="h-12 w-12 text-primary animate-spin" />
				<p class="text-muted-foreground">Loading order details...</p>
			</div>
		{:else if error}
			<div class="space-y-4">
				<div class="bg-destructive/10 text-destructive p-4 rounded-lg">
					{error}
				</div>
				<Button href="/">Return to Home</Button>
			</div>
		{:else}
			<div class="bg-card border rounded-xl p-8 shadow-sm space-y-6">
				<div class="flex justify-center">
					<div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
						<CheckCircle class="h-12 w-12 text-green-600 dark:text-green-400" />
					</div>
				</div>

				<div class="space-y-2">
					<h1 class="text-2xl font-bold">Order Confirmed!</h1>
					<p class="text-muted-foreground">
						Thank you for your purchase. We've sent a confirmation email to
						{#if orderDetails?.email}
							<span class="font-medium text-foreground">{orderDetails.email}</span>
						{:else}
							your email
						{/if}
					</p>
				</div>

				{#if orderDetails}
					<div class="bg-muted/50 rounded-lg p-4 space-y-2">
						<div class="flex justify-between text-sm">
							<span class="text-muted-foreground">Order ID</span>
							<span class="font-mono">{orderDetails.id.slice(0, 16)}...</span>
						</div>
						<div class="flex justify-between text-sm">
							<span class="text-muted-foreground">Total</span>
							<span class="font-semibold">
								${orderDetails.amount.toFixed(2)} {orderDetails.currency}
							</span>
						</div>
					</div>
				{/if}

				<div class="space-y-3">
					<Button href="/account/orders" class="w-full">
						<Package class="h-4 w-4 mr-2" />
						View Order
					</Button>
					<Button variant="outline" href="/shop" class="w-full">
						Continue Shopping
						<ArrowRight class="h-4 w-4 ml-2" />
					</Button>
				</div>
			</div>

			<p class="text-sm text-muted-foreground">
				Questions about your order?
				<a href="/contact" class="text-primary hover:underline">Contact us</a>
			</p>
		{/if}
	</div>
</div>
