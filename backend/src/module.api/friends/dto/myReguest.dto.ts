import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { mesEmptyOption } from "src/common/util/message/methods/mesEmptyOption";
import { mesIsNoIn } from "src/common/util/message/methods/mesIsNoIn";
import { mesNoValidOption } from "src/common/util/message/methods/mesNoValidOption";

export class DtoMyRequest {
	@IsString({ message: mesNoValidOption("action") })
	@IsNotEmpty({ message: mesEmptyOption("action")})
	@IsIn(['incoming-request', 'outgoing-request'], { message: mesIsNoIn('action', 'incoming-request | outgoing-request')})
	action: 'incoming-request' | 'outgoing-request';
}
