import { UpdateResult } from "typeorm";

export interface ResultUpdateEntity {
    isUpdate: boolean;
    message: string;
    result: UpdateResult;
}