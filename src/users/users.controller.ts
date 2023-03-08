import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all users',
        description: 'Returns all users',
    })
    @ApiOkResponse({ type: UserDto, isArray: true })
    async getUsers(): Promise<UserModel[]> {
        return this.usersService.findAll({});
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Get user by id',
        description: 'Returns the current user',
    })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiOkResponse({ type: UserDto })
    async getUserById(@Param('id') id: string): Promise<UserModel> {
        return this.usersService.findOne({ id: Number(id) });
    }

    @Patch(':id')
    @ApiOperation({
        summary: 'Update user by id',
        description: 'Returns the user',
    })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiBody({ type: UpdateUserDto })
    @ApiOkResponse({ type: UserDto })
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.updateUser({
            data: updateUserDto,
            where: { id: Number(id) },
        });
    }

    @Delete(':id')
    @ApiOperation({
        summary: 'Delete user by id',
        description: 'Returns the deleted user',
    })
    @ApiParam({ name: 'id', required: true, type: String })
    @ApiOkResponse({ type: UserDto })
    async deleteUser(@Param('id') id: string): Promise<UserModel> {
        return this.usersService.deleteUser({ id: Number(id) });
    }

    @Post()
    @ApiOperation({
        summary: 'Create new user',
        description: 'Returns created user',
    })
    @ApiBody({ type: CreateUserDto })
    @ApiCreatedResponse({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
        return this.usersService.create(createUserDto);
    }
}
