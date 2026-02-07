export function calculateDurationInMinutes(startDate: Date, endDate: Date): number {
	const durationInMillis = endDate.getTime() - startDate.getTime();
	const durationInMinutes = durationInMillis / 1000 / 60;
	const durationInMinutesRounded = parseFloat(durationInMinutes.toFixed(2));

	return durationInMinutesRounded;
}