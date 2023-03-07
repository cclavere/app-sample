import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Prisma, User as UserModel } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(
        @Body() createUserDto: Prisma.UserCreateInput,
    ): Promise<UserModel> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async getUsers(): Promise<UserModel[]> {
        return this.usersService.users({});
    }

    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.usersService.user({ id: Number(id) });
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.usersService.deleteUser({ id: Number(id) });
    }
}
