import { IntrApiCreated } from "@app-common/api-types/resultCreated.interface";

export interface IntrApiCreatedRequest extends IntrApiCreated {
    idRequest: number;
}