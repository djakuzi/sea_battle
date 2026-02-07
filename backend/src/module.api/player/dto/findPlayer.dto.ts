import { IsString, IsNotEmpty } from 'class-validator';

export class FindPlayerDto {
	@IsString()
	@IsNotEmpty({ message: 'Не заполнено имя игрока' })
	nickname: string;
}
