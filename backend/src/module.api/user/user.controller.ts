import { Controller, Get, HttpCode, HttpStatus, Param, Query, Req, UseGuards } from '@nestjs/common';
import { EnumNameStrategyFindUser, ServiceUserFind } from './service/userFind.service';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { DtoAllUser } from './dto/UserAll.dto';
import { AuthGuard } from 'src/common/guard/auth/auth.guard';
import { Request } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly serviceUserFind: ServiceUserFind) { }

    // @Get()
    // @HttpCode(HttpStatus.OK)
    // @UseGuards(AuthGuard)
    // async getUserOne(@Query() filter: DtoOneUser): Promise<EntityUser | null> {
    //     const res = await this.serviceUserFind.findOneUser(filter);
    //     return res;
    // }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: number): Promise<EntityUser | null> {
        const argsOne = {
            filter: {
                id: id
            }
        }

        const res = await this.serviceUserFind.find(EnumNameStrategyFindUser.ONE, argsOne);
        return res;
    }

    @Get('me')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async findMe(@Req() req: Request,) {
        const argsMe = {
            id: (req.user as EntityUser).player.id
        }

        const res = await this.serviceUserFind.find(EnumNameStrategyFindUser.ME, argsMe);
        return res;
    }

    @Get('all')
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getUserAll(@Query() filter: DtoAllUser): Promise<EntityUser[] | null> {
        const argsMore = {
            filter: filter,
        }

        const res = await this.serviceUserFind.find(EnumNameStrategyFindUser.MORE, argsMore);
        return res;
    }
}
