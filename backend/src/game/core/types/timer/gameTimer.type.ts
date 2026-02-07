export type TypeTimerEventMap = {
	onEnd: () => void;
	onDelayUpdate: (time: number, minutes: string, seconds: string) => void;
};