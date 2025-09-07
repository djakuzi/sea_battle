import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { signInUserDto } from './dto/sign-in';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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
