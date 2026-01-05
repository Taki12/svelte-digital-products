<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { User, LogOut, Settings, ShoppingBag, Heart, CreditCard } from 'lucide-svelte';
	import { userStore, isAuthenticated, user } from '$lib/stores/user';

	let menuOpen = $state(false);
</script>

{#if $isAuthenticated && $user}
	<DropdownMenu.Root bind:open={menuOpen}>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="relative">
					{#if $user.avatar}
						<img
							src={$user.avatar}
							alt={$user.name || 'User'}
							class="h-8 w-8 rounded-full object-cover"
						/>
					{:else}
						<User class="h-5 w-5" />
					{/if}
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="w-56">
			<DropdownMenu.Label>
				<div class="flex flex-col space-y-1">
					<p class="text-sm font-medium">{$user.name || 'User'}</p>
					<p class="text-xs text-muted-foreground truncate">{$user.email}</p>
				</div>
			</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Item href="/account">
				<User class="mr-2 h-4 w-4" />
				<span>My Account</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/account/orders">
				<ShoppingBag class="mr-2 h-4 w-4" />
				<span>Orders</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/wishlist">
				<Heart class="mr-2 h-4 w-4" />
				<span>Wishlist</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/account/billing">
				<CreditCard class="mr-2 h-4 w-4" />
				<span>Billing</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item href="/account/settings">
				<Settings class="mr-2 h-4 w-4" />
				<span>Settings</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item
				onclick={() => userStore.logout()}
				class="text-destructive focus:text-destructive"
			>
				<LogOut class="mr-2 h-4 w-4" />
				<span>Log out</span>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<div class="flex items-center gap-2">
		<Button variant="ghost" href="/auth/login">Sign in</Button>
		<Button href="/auth/register">Sign up</Button>
	</div>
{/if}
