import { WsServerStatus } from "../ServerStatus.module";

export class ServiceStatusPing {
	constructor() { }

	static sendPing(callback?: (latency: number) => void): void {
		const start = Date.now();
		WsServerStatus._emit('ping', start);

		WsServerStatus._onceSubscribe('ping', () => {
			const latency = Date.now() - start;

			if (callback) {
				callback(latency);
			}
		});
	}
}