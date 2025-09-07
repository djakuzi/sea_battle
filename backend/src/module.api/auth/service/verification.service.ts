import { Injectable } from "@nestjs/common";
import { VerificationsUsersRepository } from "src/module.api/auth/repositories/verififcations_users.repository";

@Injectable()
export class VerififcationService {
    constructor(
        private readonly repoVerificationUSer: VerificationsUsersRepository,
    ) { }

    async find() {

    }

    async findOne() {

    }
}