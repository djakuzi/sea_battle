import ApiClientService from '../../ApiClient.service';
import axios from 'axios';
import { IntrApiCreatedRequest } from './api-types/res.CreatedRequest.interface';
import { IntrApiAcceptRequest } from './api-types/res.AcceptRequest.interface';
import { IntrApiCloseRequest } from './api-types/res.CloseRequest.interface';
import { IntrApiDeleteFriend } from './api-types/res.DeleteFriend.interface';
import { IntrApiFindFriendship } from './api-types/res.FindFriendships.interface';
import { IntrApiActionFriend } from './api-types/res.ActionFriends.interface';

class FriendCore extends ApiClientService {

    constructor(nameController: string) {
        super(nameController);

        this.endPoints = {
            sendRequest: `/${nameController}/send-request`,
            acceptRequest: `/${nameController}/accept-request`,
            closeRequest: `/${nameController}/close-request`,
            getFriend: `/${nameController}`,
            deleteFriend: `/${nameController}/remove-friend`,
            action: `/${nameController}/action`,
        };
    }

    async sendRequest(id: number): Promise<IntrApiCreatedRequest> {
        try {
            const response = await this.apiClient.post<IntrApiCreatedRequest>(
                this.endPoints.sendRequest,
                {
                    receiverId: id
                },
                {
                    headers: {
                        Authorization: true
                    },
                }
            );

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }

            throw new Error(errorMessage);
        }
    }

    async acceptRequest(idRequest: number): Promise<IntrApiAcceptRequest> {
        try {
            const response = await this.apiClient.post<IntrApiAcceptRequest>(
                this.endPoints.acceptRequest,
                {
                    idRequest: idRequest,
                },
                {
                    headers: {
                        Authorization: true
                    },
                }
            );

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }
            throw new Error(errorMessage);
        }
    }

    async closeRequest(idRequest: number): Promise<IntrApiCloseRequest> {
        try {
            const response = await this.apiClient.post<IntrApiCloseRequest>(
                this.endPoints.closeRequest, 
                {
                    idRequest: idRequest,
                },
                {
                    headers: {
                        Authorization: true
                    },
                }
            );
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }
            throw new Error(errorMessage);
        }
    }

    async getFriends(idPlayer?: number): Promise<IntrApiFindFriendship> {
        try {
            const isNumber = typeof idPlayer === 'number';
            const url = this.endPoints.getFriend + (isNumber ? `/${idPlayer}` : '');

            const response = await this.apiClient.get<IntrApiFindFriendship>(
                url,
                {
                    headers: {
                        Authorization: true
                    },
                }
            );

            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }

            throw new Error(errorMessage);
        }
    }

    async deleteFriend(id: number): Promise<IntrApiDeleteFriend> {
        try {

            const response = await this.apiClient.post<IntrApiDeleteFriend>(
                this.endPoints.deleteFriend, 
                {
                    idFriend: id,
                },
                {
                    headers: {
                        Authorization: true
                    },
                });
            return response.data;
        } catch (e) {
            let errorMessage = 'Неизвестная ошибка входа';
            if (axios.isAxiosError(e)) {
                errorMessage = e.response?.data?.message || 'Неизвестная ошибка входа';
            }

            throw new Error(errorMessage);
        }
    }

    async getActionList(idList: number[]): Promise<IntrApiActionFriend> {
        try {
            const response = await this.apiClient.post<IntrApiActionFriend>(
                this.endPoints.action,
                {
                    listIdPlayers: idList
                },
                {
                    headers: {
                        Authorization: true
                    },
                }
            );
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

export const FriendService = new FriendCore('friends');