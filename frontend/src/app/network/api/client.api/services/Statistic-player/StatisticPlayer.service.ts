import { IntrStatisticPlayerFull } from '../../../../../common/types/StatisticPlayer.interface';
import ApiClientService from '../../ApiClient.service';
import axios from 'axios';

class StatisticPlayerCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            gettingStatistic: `/${nameController}`,
        };
    }

    async get(idPlayer?: number): Promise<IntrStatisticPlayerFull> {
        try {
            const isNumber = typeof idPlayer === 'number';
            const url = this.endPoints.gettingStatistic + (isNumber ? `/${idPlayer}` : '');

            const response = await this.apiClient.get<IntrStatisticPlayerFull>(url, {
                headers: {
                    Authorization: true,
                }
            });

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка при получении статистики игрока';

            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка при получении статистики игрока';
            }

            throw new Error(errorMessage);
        }
    }
}

export const ServiceStatisticPlayer = new StatisticPlayerCore('statistic-players');