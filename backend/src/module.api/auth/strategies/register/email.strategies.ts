import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { Frontend } from 'src/module.config/config/configuration';
import * as argon2 from 'argon2';
import { ServiceVerififcationUser } from '../../service/verification-user.service';
import { RoleId } from 'src/common/types/role';
import { createNickname } from 'src/module.api/player/util/player.util';
import { ServiceRoleUser } from 'src/module.api/role/services/roleUser.service';
import { ServiceCreativeStatisticPlayer } from 'src/module.api/statistic-players/services/createStatisticPlayer.service';
import { EntityManager } from 'typeorm';
import { VerificationId } from '../../type/verification';
import { ServiceCreateUser } from 'src/module.api/user/service/userCreate.service';
import { ServiceCreatePlayer } from 'src/module.api/player/service/createPlayer.service';

export interface IntrDataEmail {
	login?: string;
	email?: string;
	password?: string;
}

@Injectable()
export class StrategyRegisterEmail {
	FRONTEND_DOMAIN: string | undefined;
	constructor(
		private readonly serviceConfig: ConfigService,
		private readonly serviceUserCreate: ServiceCreateUser,
		private readonly serviceVerificationUser: ServiceVerififcationUser,
		private readonly serviceRoleUser: ServiceRoleUser,
		private readonly servicePlayerCreate: ServiceCreatePlayer,
		private readonly serviceCreativeStatisticPlayers: ServiceCreativeStatisticPlayer
	) {
		this.FRONTEND_DOMAIN = this.serviceConfig.get<Frontend>('frontend')?.host;
	}

	async register(data: IntrDataEmail, manager: EntityManager) {
		if (!data.email) throw new ConflictException('Email не передан');
		if (!data.password) throw new ConflictException('Пароль не передан');

		if (
			await this.serviceVerificationUser.checkVerificationUser({ email: data.email }, manager)
		) {
			throw new ConflictException('Пользователь с таким email уже есть');
		}

		const dataUser: Partial<EntityUser> = {
			login: data.login,
			is_active: true,
		};

		const argsToCreateUser = {
			data: dataUser,
			manager: manager,
		};

		const user = await this.serviceUserCreate.create(
			ServiceCreateUser.strategyName.DEFAULT,
			argsToCreateUser
		);

		const isAvailabilityRoleByUser = await this.serviceRoleUser.checkAvailabilityRole(
			{
				role_id: RoleId.PLAYER,
				user_id: user.id,
			},
			manager
		);

		if (isAvailabilityRoleByUser)
			throw new ConflictException('Данная роль уже есть у пользователя');

		const verification: Partial<EntityVerificationsUsers> = {
			verification_id: VerificationId.EMAIL,
			user_id: user.id,
			service_data: null,
			password: await argon2.hash(data.password),
			email: data.email,
		};

		const dataPlayer: Partial<EntityPlayer> = {
			user_id: user.id,
			nickname: createNickname('login', user.login),
			experience: 0,
			is_online: true,
			last_online: new Date(),
		};

		await this.serviceVerificationUser.addVerificationByUser(verification, manager);
		const player = await this.servicePlayerCreate.create(
			ServiceCreatePlayer.strategyName.DEFAULT,
			{
				data: dataPlayer,
				manager: manager,
			}
		);

		const argsCreateStatistic = {
			idPlayer: player.id,
			manager: manager,
		};

		await this.serviceCreativeStatisticPlayers.create(
			ServiceCreativeStatisticPlayer.strategyName.DEFAULT,
			argsCreateStatistic
		);

		return {
			player: player,
			user: user,
		};
	}
}
