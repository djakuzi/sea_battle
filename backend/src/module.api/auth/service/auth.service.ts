import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register.dto';
import { DataSource } from 'typeorm';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { ServiceUserFind } from 'src/module.api/user/service/userFind.service';
import { getVerificationId } from 'src/common/util/other/security.util';
import { TokenService } from './token.service';
import { signInUserDto } from '../dto/sign-in';
import { EntityPlayer } from 'src/common/entity/game.scheme/player.entity';
import { EnumNameStrategyFindPlayer, PlayerFindService } from 'src/module.api/player/service/playerFind.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { Frontend } from 'src/module.config/config/configuration';
import { Verification } from '../type/verification';
import { StrategyEmailSignIn } from '../strategies/signIn/email.strategies';
import { StrategyRegisterEmail } from '../strategies/register/email.strategies';
import { EnumNameStrategyUpdatePlayer, PlayerUpdateService } from 'src/module.api/player/service/playerUpdate.service';
import { EnumNameStrategyCheckUser, ServiceUserCheck } from 'src/module.api/user/service/userCheck.service';

@Injectable()
export class AuthService {
  FRONTEND_DOMAIN: string | undefined;

  constructor(
    private readonly serviceConfig: ConfigService,
    private readonly dataSource: DataSource,
    private readonly strategyRegisterEmail: StrategyRegisterEmail,
    private readonly strategySignInEmail: StrategyEmailSignIn,
    private readonly serviceUserCheck: ServiceUserCheck,
    private readonly serviceUserFind: ServiceUserFind,
    private readonly serviceToken: TokenService,
    private readonly serviceFindPlayer: PlayerFindService,
    private readonly serviceUpdatePlayer: PlayerUpdateService,
  ) {
    this.FRONTEND_DOMAIN = this.serviceConfig.get<Frontend>('frontend')?.host;
  }

  async signIn(res: Response, dto: signInUserDto) {
    const { email, password, verification } = dto;
    const isEmailVerification = verification === Verification.EMAIL;
    let user: EntityUser | null = null

    if (isEmailVerification) {
      const res = await this.strategySignInEmail.validate({
        password: password,
        email: email,
      })

      user = res.user;
    }

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const argsUpdateNetwork = {
      data: {
        id: user.id,
        typeEntityId: 'users' as const
      },
      isOnline: true
    }

    const resUpdateOnline = await this.serviceUpdatePlayer.update(
      EnumNameStrategyUpdatePlayer.STATUS_NETWORK, 
      argsUpdateNetwork
    );

    if (!resUpdateOnline.isUpdate) {
      throw new InternalServerErrorException('Ошибка при обновлении пользователя');
    }

    const filter = {
      filter: {
        user_id: user.id
      }
    }

    const player = await this.serviceFindPlayer.find(EnumNameStrategyFindPlayer.ONE, filter);

    if (!player) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new UnauthorizedException('Сессия истекла. Войдите заново.');
    }

    if (!resUpdateOnline.isUpdate) {
      throw new NotFoundException('Игрок не найден');
    }

    return {
      accessToken: this.serviceToken.auth(res, user.uuid, user.login),
      player: player,
    }
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
      const argsCheckUser = {
        filter: { login: dto.login },
      }
      const isUser = await this.serviceUserCheck.check(EnumNameStrategyCheckUser.AVAILABILITY, argsCheckUser);

      if (isUser) throw new ConflictException('Пользователь с таким логином уже существует');

      let resRegister: {
        player: EntityPlayer;
        user: EntityUser
      } | null = null

      if (isEmailVerification) {
        resRegister = await this.strategyRegisterEmail.register(dto, manager);
      }

      if (!resRegister) throw new ConflictException('Не получилось зарегестрировать пользователя');

      return {
        accessToken: this.serviceToken.auth(res, resRegister.user.uuid, resRegister.user.login),
        player: resRegister.player
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

    const filter = {
      filter: {
        user_id: user.id
      }
    }

    const player = await this.serviceFindPlayer.find(EnumNameStrategyFindPlayer.ONE, filter);

    if (!player) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new UnauthorizedException('Сессия истекла. Войдите заново.');
    }

    const argsUpdateNetwork = {
      data: {
        id: user.id,
        typeEntityId: 'users' as const
      },
      isOnline: true
    }

    const resUpdateOnline = await this.serviceUpdatePlayer.update(
      EnumNameStrategyUpdatePlayer.STATUS_NETWORK,
      argsUpdateNetwork
    );

    if (!resUpdateOnline.isUpdate) {
      this.serviceToken.setCookie(res, "", new Date());
      throw new InternalServerErrorException('Ошибка при обновлении пользователя');
    }

    return {
      accessToken: this.serviceToken.auth(res, user.uuid, user.login),
      player
    }
  }
}
