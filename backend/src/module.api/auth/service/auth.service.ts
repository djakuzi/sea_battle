import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register.dto';
import { DataSource } from 'typeorm';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { UserService } from 'src/module.api/user/service/user.service';
import { VerififcationUserService } from './verification-user.service';
import { RoleUserService } from 'src/module.api/role/services/role_user.service';
import { RoleId } from 'src/common/type/role';
import * as argon2 from 'argon2';
import { EntityVerificationsUsers } from 'src/common/entity/public.scheme/verifications_users.entity';
import { getVerificationId } from 'src/common/util/other/security.util';
import { TokenService } from './token.service';
import { signInUserDto } from '../dto/sign-in';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { createNickname } from 'src/module.api/player/util/player.util';
import { PlayerFindService } from 'src/module.api/player/service/playerFind.service';
import { UpdatePlayer } from 'src/module.api/player/interface/UpdatePlayer.interface';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Frontend } from 'src/module.config/config/configuration';
import { Verification, VerificationId } from '../interface/verification';
import { PlayerChangeService } from 'src/module.api/player/service/playerChange.service';
import { PlayerService } from 'src/module.api/player/service/player.service';
import { StatisticPlayerService } from 'src/module.api/statistic-players/services/statisticPlayer.service';

@Injectable()
export class AuthService {
  FRONTEND_DOMAIN: string | undefined
  constructor(
    private readonly serviceConfig: ConfigService,
    private readonly dataSource: DataSource,
    private readonly serviceUser: UserService,
    private readonly serviceVerificationUser: VerififcationUserService,
    private readonly serviceRoleUser: RoleUserService,
    private readonly serviceToken: TokenService,
    private readonly servicePlayer: PlayerService,
    private readonly serviceFindPlayer: PlayerFindService,
    private readonly serviceChangePlayer: PlayerChangeService,
    private readonly serviceStatisticPlayers: StatisticPlayerService
  ) {
    this.FRONTEND_DOMAIN = this.serviceConfig.get<Frontend>('frontend')?.host;
  }

  async signIn(res: Response, dto: signInUserDto) {
    return await this.dataSource.transaction(async (manager) => {
      const { email, password, verification } = dto;
      const isEmailVerification = verification === Verification.EMAIL;
      let verificationsUsers: EntityVerificationsUsers | null = null;
      let user: EntityUser | null = null

      if (isEmailVerification) {
        if (!email) throw new ConflictException('Email не передан');
        if (!password) throw new ConflictException('Пароль не передан');

        verificationsUsers = await this.serviceVerificationUser.findVerification({ email }, manager);
        if (!verificationsUsers) throw new NotFoundException('Пользователь с таким email не найден');

        const validPassword = verificationsUsers.password;
        if (!validPassword) throw new NotFoundException('У пользователя пароль не установлен');

        const isValidPassword = await argon2.verify(validPassword, password);
        if (!isValidPassword) throw new NotFoundException('Неверный пароль');

        user = verificationsUsers?.user;
      }

      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }

      const dataUpdateOnline: UpdatePlayer = {
        id: user.id,
        typeEntityId: 'users'
      }

      const resUpdateOnline = await this.serviceChangePlayer.updateStatusOnline(dataUpdateOnline, true);

      if (!resUpdateOnline.isUpdate) {
        throw new InternalServerErrorException('Ошибка при обновлении пользователя');
      }

      const filter: Partial<EntityPlayer> = {
        user_id: user.id,
      }

      const player = await this.serviceFindPlayer.findOne(filter);

      if (!resUpdateOnline.isUpdate) {
        throw new NotFoundException('Игрок не найден');
      }

      return {
        accessToken: this.auth(res, user.uuid, user.login),
        player: player,
      }
    })
  }

  async signOut(res: Response): Promise<Record<string, boolean>> {
    this.serviceToken.setCookie(res, "", new Date());

    return {
      isLogout: true,
    }
  }

  async register(res: Response, dto: RegisterUserDto) {
    return await this.dataSource.transaction(async (manager) => {
      const idVerification = getVerificationId(dto.verification);

      if (!idVerification) {
        throw new ConflictException('Такого способа регистрации не существует');
      }

      const isEmailVerification = dto.verification === Verification.EMAIL;
      const isUser = await this.serviceUser.checkAvailabilityUser({ login: dto.login }, manager);
      let isVerificationByUser: boolean = false;

      if (isUser) throw new ConflictException('Пользователь с таким логином уже существует');

      if (isEmailVerification) {
        if (!dto.email) throw new ConflictException('Email не передан');
        if (!dto.password) throw new ConflictException('Пароль не передан');

        isVerificationByUser = await this.serviceVerificationUser.checkVerificationUser({ email: dto.email }, manager);
        if (isVerificationByUser) throw new ConflictException('Пользователь с таким email уже есть');
      }

      const dataUser: Partial<EntityUser> = {
        login: dto.login,
        is_active: true,
      }

      const user = await this.serviceUser.createUser(dataUser, manager);

      const dataForConditionsByRole = {
        role_id: RoleId.PLAYER,
        user_id: user.id,
      }

      const isAvailabilityRoleByUser = await this.serviceRoleUser.checkAvailabilityRole(dataForConditionsByRole, manager);
      if (isAvailabilityRoleByUser) throw new ConflictException('Данная роль уже есть у пользователя');

      const verification: Partial<EntityVerificationsUsers> = {
        verification_id: isEmailVerification ? VerificationId.EMAIL : idVerification,
        user_id: user.id,
        service_data: isEmailVerification ? null : '',
        password: isEmailVerification && dto.password ? await argon2.hash(dto.password) : null,
        email: isEmailVerification && dto.email ? dto.email : null,
      }

      const dataPlayer: Partial<EntityPlayer> = {
        user_id: user.id,
        nickname: createNickname('login', user.login),
        experience: 0,
        is_online: true,
        last_online: new Date(),
      }

      await this.serviceVerificationUser.addVerificationByUser(verification, manager);
      const player = await this.servicePlayer.createPlayer(dataPlayer, manager);

      await this.serviceStatisticPlayers.createStatistic(player.id, manager);

      return {
        accessToken: this.auth(res, user.uuid, user.login),
        player
      }
    });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = (req.cookies as Record<string, string>)['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Сессия истекла. Войдите заново.');
    }

    const user = await this.serviceToken.checkTokenUser(refreshToken);

    if (!user) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new UnauthorizedException('Сессия истекла. Войдите заново.');
    }

    const filter: Partial<EntityPlayer> = {
      user_id: user.id,
    }

    const player = await this.serviceFindPlayer.findOne(filter);

    if (!player) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new UnauthorizedException('Сессия истекла. Войдите заново.');
    }

    const dataUpdateOnline: UpdatePlayer = {
      id: user.id,
      typeEntityId: 'users'
    }

    const resUpdateOnline = await this.serviceChangePlayer.updateStatusOnline(dataUpdateOnline, true);

    if (!resUpdateOnline.isUpdate) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new InternalServerErrorException('Ошибка при обновлении пользователя');
    }

    return {
      accessToken: this.auth(res, user.uuid, user.login),
      player
    }
  }

  auth(res: Response, uuid: string, login: string): string {
    const { accessToken, refreshToken } = this.serviceToken.generateTokenUser(uuid, login);

    this.serviceToken.setCookie(res, refreshToken, new Date(Date.now() + 604800));
    return accessToken
  }
}
