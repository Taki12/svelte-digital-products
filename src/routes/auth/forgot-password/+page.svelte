<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-svelte';

	let email = $state('');
	let loading = $state(false);
	let success = $state(false);
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1500));

		// In production, this would call your password reset API
		success = true;
		loading = false;
	}
</script>

<svelte:head>
	<title>Forgot Password</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background px-4">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold">Reset Password</h1>
			<p class="text-muted-foreground mt-2">
				Enter your email and we'll send you a reset link
			</p>
		</div>

		<div class="bg-card border rounded-xl p-6 shadow-sm">
			{#if success}
				<div class="text-center space-y-4">
					<div class="flex justify-center">
						<div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
							<CheckCircle class="h-8 w-8 text-green-600 dark:text-green-400" />
						</div>
					</div>
					<h2 class="text-xl font-semibold">Check your email</h2>
					<p class="text-muted-foreground">
						If an account exists for {email}, you'll receive a password reset link shortly.
					</p>
					<Button href="/auth/login" variant="outline" class="w-full">
						<ArrowLeft class="h-4 w-4 mr-2" />
						Back to Login
					</Button>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="space-y-4">
					{#if error}
						<div class="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">
							{error}
						</div>
					{/if}

					<div class="space-y-2">
						<Label for="email">Email</Label>
						<div class="relative">
							<Mail class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								class="pl-10"
								bind:value={email}
								required
							/>
						</div>
					</div>

					<Button type="submit" class="w-full" disabled={loading}>
						{#if loading}
							<Loader2 class="h-4 w-4 mr-2 animate-spin" />
							Sending...
						{:else}
							Send Reset Link
						{/if}
					</Button>

					<Button href="/auth/login" variant="ghost" class="w-full">
						<ArrowLeft class="h-4 w-4 mr-2" />
						Back to Login
					</Button>
				</form>
			{/if}
		</div>
	</div>
</div>
