import { Google } from 'arctic';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	GOOGLE_REDIRECT_URI
} from '$env/static/private';

export const google = new Google(
	GOOGLE_CLIENT_ID || '',
	GOOGLE_CLIENT_SECRET || '',
	GOOGLE_REDIRECT_URI || ''
);

export interface GoogleUser {
	sub: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	email: string;
	email_verified: boolean;
}

export async function getGoogleUser(accessToken: string): Promise<GoogleUser> {
	const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
		headers: {
			Authorization: `Bearer ${accessToken}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to fetch Google user');
	}

	return response.json();
}
