import { IsNotEmpty, IsNumber } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";
import { mesNoValidOption } from "src/common/util/message/methods/mesNoValidOption";

export class DtoRemoveFriend {
	@IsNumber(undefined, { message: mesNoValidOption("idFriend") })
	@IsNotEmpty({ message: mesEmptyOption("idFriend")})
	idFriend: number;
}
