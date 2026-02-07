
import ApiClientService from '@app-network/api/client.api/ApiClient.service';
import axios from 'axios';
import { IntrApiGetOneVsOne } from './api-types/res.getOneVsOne.interface';

class BattlesCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
			getOneVsONe: `/${nameController}/`,
        };
    }
	async getOneVsONe(): Promise<IntrApiGetOneVsOne[]> {
        try {
			const response = await this.apiClient.get<IntrApiGetOneVsOne[]>(
				this.endPoints.getOneVsONe,
                {
                    headers: {
                        Authorization: true
                    },
                }
            );

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка  получения истории битв';
            if (axios.isAxiosError(e)) {
				errorMessage = e.response?.data?.message || 'Неизвестная ошибка  получения истории битв';
            }

            throw new Error(errorMessage);
        }
    }
}

export const BattlesService = new BattlesCore('battles');