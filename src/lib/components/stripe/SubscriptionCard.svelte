<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Check, Loader2 } from 'lucide-svelte';

	interface Props {
		name: string;
		description?: string;
		priceId: string;
		price: number;
		interval: 'month' | 'year';
		features: string[];
		popular?: boolean;
		email?: string;
	}

	let {
		name,
		description,
		priceId,
		price,
		interval,
		features,
		popular = false,
		email
	}: Props = $props();

	let loading = $state(false);
	let error = $state('');

	async function subscribe() {
		if (!email) {
			error = 'Please provide your email';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/subscriptions', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					priceId,
					email
				})
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Failed to create subscription';
				return;
			}

			// Handle subscription completion
			if (data.clientSecret) {
				// Redirect to payment completion
				window.location.href = `/checkout/subscription?client_secret=${data.clientSecret}&subscription_id=${data.subscriptionId}`;
			} else if (data.status === 'active') {
				// Trial or no payment required
				window.location.href = '/account?subscription=success';
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
			console.error('Subscription error:', err);
		} finally {
			loading = false;
		}
	}
</script>

<div
	class="relative bg-card border rounded-xl p-6 flex flex-col
    {popular ? 'border-primary shadow-lg' : ''}"
>
	{#if popular}
		<Badge class="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
	{/if}

	<h3 class="text-xl font-bold">{name}</h3>
	{#if description}
		<p class="text-muted-foreground text-sm mt-1">{description}</p>
	{/if}

	<div class="mt-4">
		<span class="text-4xl font-bold">${price}</span>
		<span class="text-muted-foreground">/{interval}</span>
	</div>

	<ul class="mt-6 space-y-3 flex-1">
		{#each features as feature}
			<li class="flex items-start gap-2">
				<Check class="h-5 w-5 text-primary shrink-0 mt-0.5" />
				<span class="text-sm">{feature}</span>
			</li>
		{/each}
	</ul>

	<Button
		class="w-full mt-6"
		variant={popular ? 'default' : 'outline'}
		onclick={subscribe}
		disabled={loading}
	>
		{#if loading}
			<Loader2 class="h-4 w-4 mr-2 animate-spin" />
			Processing...
		{:else}
			Subscribe
		{/if}
	</Button>

	{#if error}
		<p class="text-sm text-destructive text-center mt-2">{error}</p>
	{/if}
</div>
