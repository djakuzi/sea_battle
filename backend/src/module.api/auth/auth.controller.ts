import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { signInUserDto } from './dto/sign-in';
import { Request, Response } from 'express';
import { ServiceVerififcationUser } from './service/verification-user.service';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly serviceVerificationUser: ServiceVerififcationUser
  ) { }

  @Get('me-verification')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async getMeVerification(@Req() req: Request) {
    return await this.serviceVerificationUser.getListVerificationUser((req.user as EntityUser).id);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Res({ passthrough: true }) response: Response, @Body() dto: signInUserDto) {
    return await this.authService.signIn(response, dto);
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Res({ passthrough: true }) res: Response,) {
    return await this.authService.signOut(res);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Res({ passthrough: true }) response: Response, @Body() dto: RegisterUserDto) {
    return await this.authService.register(response, dto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response) {
    return await this.authService.refresh(req, res)
  }
}
