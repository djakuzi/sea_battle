export function isGuest(userId: string): boolean {
	return userId.includes("guest");
}