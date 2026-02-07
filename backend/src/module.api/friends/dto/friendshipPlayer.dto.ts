import { IsNotEmpty, IsNumber } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";
import { mesNoValidOption } from "src/common/util/message/methods/mesNoValidOption";

export class DtoFriendshipPlayer {
	@IsNumber(undefined, { message: mesNoValidOption("idPlayer") })
	@IsNotEmpty({ message: mesEmptyOption("idPlayer")})
	idPlayer: number;
}
