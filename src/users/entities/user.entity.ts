/* eslint-disable @typescript-eslint/indent */
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserDto implements User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty({ type: 'string', required: false, nullable: true })
    nickname: string | null;

    @ApiProperty({ type: Number, minimum: 1, maximum: 100 })
    age: number;

    @ApiProperty({ type: 'string', format: 'date-time' })
    birthday: Date;

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        required: false,
        nullable: true,
    })
    lastModification: Date | null;

    @ApiProperty({
        type: 'string',
        format: 'date-time',
        required: false,
        nullable: true,
    })
    lastConnexion: Date | null;
}
