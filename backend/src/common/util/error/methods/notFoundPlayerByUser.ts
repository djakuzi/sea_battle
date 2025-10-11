import { NotFoundException } from '@nestjs/common';

export class ExceptionPlayerByUserNotFound extends NotFoundException {
	constructor(userId?: string) {
		super(`Игрок ${userId ? 'с ID ' + userId: ''} не найден`);
	}
}