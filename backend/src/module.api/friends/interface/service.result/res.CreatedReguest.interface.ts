import { IntrResCreated } from 'src/common/types/result-res-api/resultCreated.interface';

export interface IntrResCreatedRequest extends IntrResCreated {
	idRequest: number;
}
