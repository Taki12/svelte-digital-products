<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowLeft } from 'lucide-svelte';
</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="Your source for digital products." />
</svelte:head>

<div class="min-h-screen bg-background">
	<div class="container mx-auto px-4 py-16 max-w-4xl">
		<Button variant="ghost" href="/" class="mb-8">
			<ArrowLeft class="h-4 w-4 mr-2" />
			Back to Home
		</Button>

		<h1 class="text-4xl font-bold mb-6">About Us</h1>

		<div class="prose prose-lg dark:prose-invert max-w-none">
			<p class="text-xl text-muted-foreground mb-8">
				Your source for digital products.
			</p>

			<div class="bg-card border rounded-xl p-8 text-center">
				<p class="text-muted-foreground">
					This page is coming soon. Check back later for updates.
				</p>
			</div>
		</div>
	</div>
</div>
