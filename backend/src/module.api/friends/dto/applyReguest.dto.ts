import { IsNotEmpty, IsNumber } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";
import { mesNoValidOption } from "src/common/util/message/methods/mesNoValidOption";

export class DtoApplyRequest {
	@IsNumber(undefined, { message: mesNoValidOption("idRequest") })
	@IsNotEmpty({ message: mesEmptyOption("idRequest")})
	idRequest: number;
}
