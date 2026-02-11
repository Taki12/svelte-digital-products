<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		goto('/auth/login', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Authentication</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center bg-background">
	<div class="text-center">
		<p class="text-muted-foreground">Redirecting to login...</p>
	</div>
</div>
