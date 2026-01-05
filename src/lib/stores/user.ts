import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

export interface UserProfile {
	id: string;
	email: string;
	name: string | null;
	avatar: string | null;
	provider: 'email' | 'google' | 'github';
}

interface UserState {
	user: UserProfile | null;
	loading: boolean;
}

function createUserStore() {
	const { subscribe, set, update } = writable<UserState>({
		user: null,
		loading: true
	});

	return {
		subscribe,

		setUser: (user: UserProfile | null) => {
			set({ user, loading: false });
		},

		setLoading: (loading: boolean) => {
			update((state) => ({ ...state, loading }));
		},

		logout: async () => {
			try {
				await fetch('/auth/logout', { method: 'POST' });
				set({ user: null, loading: false });
				if (browser) {
					window.location.href = '/';
				}
			} catch (err) {
				console.error('Logout error:', err);
			}
		},

		refresh: async () => {
			update((state) => ({ ...state, loading: true }));
			try {
				const response = await fetch('/api/user');
				if (response.ok) {
					const data = await response.json();
					set({ user: data.user, loading: false });
				} else {
					set({ user: null, loading: false });
				}
			} catch (err) {
				set({ user: null, loading: false });
			}
		}
	};
}

export const userStore = createUserStore();

// Derived stores
export const user = derived(userStore, ($store) => $store.user);
export const isAuthenticated = derived(userStore, ($store) => !!$store.user);
export const isLoading = derived(userStore, ($store) => $store.loading);
