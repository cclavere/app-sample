import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'src/common/configs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: false,
            isGlobal: true,
            load: [config],
        }),
        UsersModule,
        PrismaModule,
    ],
})
export class AppModule {}
