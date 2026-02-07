import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceStorageSocket {
	userSockets: Map<string, { [namespace: string]: string }> = new Map();

	registerSocket(userId: string, namespace: string, socketId: string) {
		const userSocketData = this.userSockets.get(userId) || {};
		userSocketData[namespace] = socketId;
		this.userSockets.set(userId, userSocketData);
	}

	getSocketId(userId: string, namespace: string): string | undefined {
		return this.userSockets.get(userId)?.[namespace];
	}

	unregisterSocket(userId: string, namespace: string) {
		const userSocketData = this.userSockets.get(userId);
		if (userSocketData) {
			delete userSocketData[namespace];

			if (Object.keys(userSocketData).length === 0) {
				this.userSockets.delete(userId);
			} else {
				this.userSockets.set(userId, userSocketData);
			}
		}
	}
}
