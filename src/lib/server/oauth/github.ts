import { GitHub } from 'arctic';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	GITHUB_REDIRECT_URI
} from '$env/static/private';

export const github = new GitHub(
	GITHUB_CLIENT_ID || '',
	GITHUB_CLIENT_SECRET || '',
	GITHUB_REDIRECT_URI || null
);

export interface GitHubUser {
	id: number;
	login: string;
	name: string | null;
	email: string | null;
	avatar_url: string;
}

export interface GitHubEmail {
	email: string;
	primary: boolean;
	verified: boolean;
	visibility: string | null;
}

export async function getGitHubUser(accessToken: string): Promise<GitHubUser> {
	const response = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/vnd.github+json'
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch GitHub user');
	}

	return response.json();
}

export async function getGitHubEmail(accessToken: string): Promise<string | null> {
	const response = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: 'application/vnd.github+json'
		}
	});

	if (!response.ok) {
		return null;
	}

	const emails: GitHubEmail[] = await response.json();
	const primary = emails.find((e) => e.primary && e.verified);
	return primary?.email || emails[0]?.email || null;
}
