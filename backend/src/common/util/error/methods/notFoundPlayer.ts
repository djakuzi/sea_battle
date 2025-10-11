import { NotFoundException } from '@nestjs/common';

export class ExceptionPlayerNotFound extends NotFoundException {
	constructor(playerId?: string) {
		super(`Игрок ${playerId ? 'с ID ' + playerId : ''} не найден`);
	}
}