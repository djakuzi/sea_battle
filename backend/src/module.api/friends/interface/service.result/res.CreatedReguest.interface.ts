import { IntrResCreated } from "src/common/type/result-res-api/resultCreated.interface";

export interface IntrResCreatedRequest extends IntrResCreated  {
    idRequest: number;
}