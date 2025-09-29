import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class PingService {
  constructor() { }

  sendPing(client: Socket): void {

    client.emit('ping');
  }
}