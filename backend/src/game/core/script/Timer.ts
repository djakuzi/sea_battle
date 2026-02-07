import { CoreGame } from "../coreGame";
import { IntrTimer } from "../types/timer/gameTimer.interface";

export interface IntrData {
	timer: IntrTimer
}

export interface IntrData {
	timer: IntrTimer;
}

export class CoreTimer {
	protected core: CoreGame;
	protected timerId: ReturnType<typeof setInterval> | null = null;

	protected dataTimer: IntrData = {
		timer: {
			time: 30,
			minutes: '00',
			seconds: '30',
		},
	};

	constructor(core: CoreGame) {
		this.core = core;
	}

	updateDataTimer(timer?: IntrTimer): void {
		const time = timer?.time ?? 30;
		const minutes = timer?.minutes ?? '00';
		const seconds = timer?.seconds ?? '30';

		this.dataTimer.timer = { time, minutes, seconds };
	}
}

export class Listenner {
	timer: Timer;
	private onEndCallbacks: (() => void)[] = [];

	private onDelayUpdateCallbacks: ((time: number, minutes: string, seconds: string) => void)[] = [];

	constructor(timer: Timer) {
		this.timer = timer;
	}

	onEnd(callback: () => void): void {
		this.onEndCallbacks.push(callback);
	}

	emitEnd(): void {
		for (const cb of this.onEndCallbacks) {
			cb();
		}
	}

	onDelayUpdate(callback: (time: number, minutes: string, seconds: string) => void): void {
		this.onDelayUpdateCallbacks.push(callback);
	}

	emitDelayUpdate(time: number, minutes: string, seconds: string): void {
		for (const cb of this.onDelayUpdateCallbacks) {
			cb(time, minutes, seconds);
		}
	}

	destroy = () => {
		this.onEndCallbacks = [];
		this.onDelayUpdateCallbacks= [];	
	}
}

export class Timer extends CoreTimer {
	listenner: Listenner;

	constructor(core: CoreGame) {
		super(core);

		this.listenner = new Listenner(this);
	}

	protected updateTimer = (): void => {
		const { time } = this.dataTimer.timer;
		const newTime = time - 1;

		if (newTime < 0) {
			this.resetTimer();
			this.listenner.emitEnd();
		} else {
			const minutes = Math.floor(newTime / 60);
			const seconds = newTime % 60;

			const minutesStr = minutes.toString().padStart(2, '0');
			const secondsStr = seconds.toString().padStart(2, '0');

			this.updateDataTimer({
				time: newTime,
				minutes: minutesStr,
				seconds: secondsStr,
			});
			
			if (newTime % 5 === 0) {
				this.listenner.emitDelayUpdate(newTime, minutesStr, secondsStr);
			}
		}
	};

	/**
	 * @method setTimer начать отсчет боя
	 */
	setTimer(): void {
		if (this.timerId !== null) {
			return;
		}

		this.timerId = setInterval(this.updateTimer, 1000);
	}

	/**
	 * @method stopTimer остановить таймер боя
	 */
	stopTimer(): void {
		if (this.timerId !== null) {
			clearInterval(this.timerId);
			this.timerId = null;
		}
	}

	/**
	 * @method resetTimer сбросить таймер боя
	 */
	resetTimer(): void {
		this.stopTimer();
		this.updateDataTimer();
	}

	destoy = () => {
		this.stopTimer();
		this.listenner.destroy();
	}
}
