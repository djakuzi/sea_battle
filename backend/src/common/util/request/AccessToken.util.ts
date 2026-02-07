import { Request } from 'express';

export function extractAccessToken(reg: Request): string | null {
	const { authorization } = reg.headers;

	if (typeof authorization === 'string' && authorization.startsWith('Bearer ')) {
		return authorization.split(' ')[1];
	}

	return null;
}
