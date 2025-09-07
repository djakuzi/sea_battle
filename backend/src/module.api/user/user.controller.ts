import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './service/user.service';
import { DtoOneUser } from './dto/UserOne.dto';
import { EntityUser } from 'src/common/entity/public.scheme/user.entity';
import { DtoAllUser } from './dto/UserAll.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getUserOne(@Query() filter: DtoOneUser): Promise<EntityUser | null> {
        const res = await this.userService.findOneUser(filter);
        return res;
    }

    @Get('all')
    async getUserAll(@Query() filter: DtoAllUser): Promise<EntityUser[] | null> {
        const res = await this.userService.findAllUser(filter);
        return res;
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<EntityUser | null> {
        const filter: DtoOneUser = {
            id: id,
        };

        const res = await this.userService.findOneUser(filter);
        return res;
    }
}
