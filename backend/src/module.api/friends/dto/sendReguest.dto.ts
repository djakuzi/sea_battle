import { IsNotEmpty, IsNumber } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";
import { mesNoValidOption } from "src/common/util/message/methods/mesNoValidOption";

export class DtoSendRequest {
	@IsNumber(undefined, { message: mesNoValidOption("receiverId") })
	@IsNotEmpty({ message: mesEmptyOption("receiverId")})
	receiverId: number;
}
