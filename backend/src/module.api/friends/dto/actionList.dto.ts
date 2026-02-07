import { IsArray, IsNotEmpty } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";

export class DtoActionList {
	@IsArray()
	@IsNotEmpty({ message: mesEmptyOption("listIdPlayers")})
	listIdPlayers: number[];
}
