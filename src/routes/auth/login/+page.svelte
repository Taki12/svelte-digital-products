<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Mail, Lock, Chrome, Github, Loader2 } from 'lucide-svelte';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let error = $state('');

	async function handleSubmit(e: Event) {
		e.preventDefault();
		loading = true;
		error = '';

		try {
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});

			const data = await response.json();

			if (!response.ok) {
				error = data.message || 'Login failed';
				return;
			}

			window.location.href = '/';
		} catch (err) {
			error = 'An error occurred. Please try again.';
		} finally {
			loading = false;
		}
	}

	function loginWithGoogle() {
		window.location.href = '/auth/callback/google/authorize';
	}

	function loginWithGitHub() {
		window.location.href = '/auth/callback/github/authorize';
	}
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background px-4">
	<div class="w-full max-w-md space-y-8">
		<div class="text-center">
			<h1 class="text-3xl font-bold">Welcome back</h1>
			<p class="text-muted-foreground mt-2">Sign in to your account</p>
		</div>

		<div class="bg-card border rounded-xl p-6 shadow-sm space-y-6">
			<!-- OAuth Buttons -->
			<div class="space-y-3">
				<Button
					variant="outline"
					class="w-full"
					onclick={loginWithGoogle}
				>
					<Chrome class="h-5 w-5 mr-2" />
					Continue with Google
				</Button>
				<Button
					variant="outline"
					class="w-full"
					onclick={loginWithGitHub}
				>
					<Github class="h-5 w-5 mr-2" />
					Continue with GitHub
				</Button>
			</div>

			<div class="relative">
				<Separator />
				<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
					or continue with email
				</span>
			</div>

			<!-- Email/Password Form -->
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

				<div class="space-y-2">
					<div class="flex justify-between">
						<Label for="password">Password</Label>
						<a href="/auth/forgot-password" class="text-sm text-primary hover:underline">
							Forgot password?
						</a>
					</div>
					<div class="relative">
						<Lock class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
						<Input
							id="password"
							type="password"
							placeholder="••••••••"
							class="pl-10"
							bind:value={password}
							required
						/>
					</div>
				</div>

				<Button type="submit" class="w-full" disabled={loading}>
					{#if loading}
						<Loader2 class="h-4 w-4 mr-2 animate-spin" />
						Signing in...
					{:else}
						Sign in
					{/if}
				</Button>
			</form>
		</div>

		<p class="text-center text-sm text-muted-foreground">
			Don't have an account?
			<a href="/auth/register" class="text-primary hover:underline font-medium">
				Sign up
			</a>
		</p>
	</div>
</div>
