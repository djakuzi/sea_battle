import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { EntityFriendRequest } from "src/common/entity/game.scheme/friendRequest.entity";
import { EntityFriendship } from "src/common/entity/game.scheme/friendShip.entity";
import { EntityPlayer } from "src/common/entity/game.scheme/player.entity";
import { EntityStatisticPlayers } from "src/common/entity/game.scheme/statistic-players.entity";
import { EntityRolesUsers } from "src/common/entity/links.scheme/roles_users.entity";
import { EntityUser } from "src/common/entity/public.scheme/user.entity";
import { EntityVerificationsUsers } from "src/common/entity/public.scheme/verifications_users.entity";
import { EntityRole } from "src/common/entity/reference.scheme/role.entity";
import { EntityVerifications } from "src/common/entity/reference.scheme/verifications.entity";
import { Database } from "src/module.config/config/configuration";

export async function getDatabaseConfig(configService: ConfigService): Promise<TypeOrmModuleOptions> {
    const dbConfig = configService.get<Database>('database');

    if (dbConfig?.type !== 'postgres') {
        throw new Error('Type database not correct: ' + dbConfig?.type);
    }

    return {
        applicationName: 'Backend SeaBattle',
        type: dbConfig?.type,
        host: dbConfig?.host,
        port: +(dbConfig?.port || '5432'),
        username: dbConfig?.username,
        password: dbConfig?.password,
        database: dbConfig?.name,
        entities: [
            EntityRole,
            EntityUser,
            EntityRolesUsers,
            EntityVerificationsUsers,
            EntityVerifications,
            EntityPlayer,
            EntityStatisticPlayers,
            EntityFriendRequest,
            EntityFriendship
        ],
        retryAttempts: 10,
        retryDelay: 1000,
        maxQueryExecutionTime: 5000,
        logging: true,
        logger: 'file',
        cache: {
            duration: 60000, // 60 seconds
        },
    };
}