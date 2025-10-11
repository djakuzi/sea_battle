import { NotFoundException } from '@nestjs/common';

export class ExceptionUserNotFound extends NotFoundException {
	constructor(userId?: string) {
		super(`Пользователь ${userId ? 'с ID ' + userId: ''} не найден`);
	}
}