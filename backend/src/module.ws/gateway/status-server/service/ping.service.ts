import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class PingService {
	constructor() {}

	async sendPing(client: Socket): Promise<void> {
		client.emit('ping');
	}
}
