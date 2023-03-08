import { OmitType } from '@nestjs/swagger';
import { UserDto } from './../entities/user.entity';

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}
