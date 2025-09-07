import { AxiosInstance } from "axios";
import { apiClient } from "./ApiClient.axios";

class ApiClientService {
    settings: {
        nameController: string;
    };
    apiClient: AxiosInstance;
    endPoints: Record<string, string>;

    constructor(nameController: string) {

        this.settings = {
            nameController,
        };

        this.apiClient = apiClient;

        this.endPoints = {};
    }
}

export default ApiClientService;
