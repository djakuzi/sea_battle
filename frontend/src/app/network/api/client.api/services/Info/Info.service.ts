import ApiClientService from '../../ApiClient.service';
import axios from 'axios';
import { CountOnlinePlayers } from './api-types/countOnline.interface';

class InfoCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            countOnlinePlayers: `/${nameController}/count-online`,
        };
    }

    async getCountOnlinePlayers(): Promise<CountOnlinePlayers> {
        try {
            const response = await this.apiClient.get<CountOnlinePlayers>(this.endPoints.countOnlinePlayers);
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';

            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }

            throw new Error(errorMessage);
        }
    }
}

export const ServiceInfo = new InfoCore('info');