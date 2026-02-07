import { IntrGuest } from "src/common/types/guest/guest.interface";

export function createGuest(id: string): IntrGuest {
	return {
		id: id,
		nickname: id,
		experience: 0
	}
}