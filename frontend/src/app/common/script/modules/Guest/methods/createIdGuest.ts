import { isErrorWithConsole } from "@app-common/script/utils/error/method/isErrorWithConsole";

const KEY_USER_GUEST = 'user-id-guest';

export function createIdGuest(): string {
	try {
		const userRestore = localStorage.getItem(KEY_USER_GUEST);

		if (typeof userRestore === 'string') {
			return userRestore;
		}

		const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000);
		const userGuest = `guest${randomDigits}`;

		localStorage.setItem(KEY_USER_GUEST, userGuest);

		return userGuest;
	} catch (error) {
		isErrorWithConsole(error);

		const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000);
		const userGuest = `guest${randomDigits}`;
		
		return userGuest;
	}
}
