export function calculateRatio(numerator: number, denominator: number): number {
	if (denominator === 0) {
		return 0;
	}
	const ratio = (numerator / denominator) * 100;
	return parseFloat(ratio.toFixed(2));
}