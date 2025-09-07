export function createIdGuest(): string {
    const randomDigits = Math.floor(100000000000 + Math.random() * 900000000000);
    return `guest${randomDigits}`;
}