import { IntrStatusNetworkPlayer } from '@app-common/types/Player.interface';
import ApiClientService from '../../ApiClient.service';
import { IntrFindPlayers } from './types/GettingOnePlayer.interface';
import axios from 'axios';

class PlayerCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            findPlayers: `/${nameController}/find-players`,
            stausOnlinePlayers: `/${nameController}/status-network`,
        };
    }

    async findPlayers(filter): Promise<IntrFindPlayers> {
        try {
            const response = await this.apiClient.post<IntrFindPlayers>(this.endPoints.findPlayers, filter);
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';

            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }

            throw new Error(errorMessage);
        }
    }


    async getStatusOnline(id: number): Promise<IntrStatusNetworkPlayer | null> {
        try {
            const filter = {
                id: id,
            }

            const response = await this.apiClient.post<IntrStatusNetworkPlayer>(this.endPoints.stausOnlinePlayers, filter)
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

export const PlayerService = new PlayerCore('player');