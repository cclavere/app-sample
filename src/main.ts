import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
    CorsConfig,
    NestConfig,
    SwaggerConfig,
} from './common/configs/config.interface';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // enable shutdown hook
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const configService = app.get(ConfigService);
    const nestConfig = configService.get<NestConfig>('nest');
    const corsConfig = configService.get<CorsConfig>('cors');
    const swaggerConfig = configService.get<SwaggerConfig>('swagger');

    // Swagger API
    if (swaggerConfig.enabled) {
        const options = new DocumentBuilder()
            .addServer(
                swaggerConfig.servers[0].url,
                swaggerConfig.servers[0].description,
            )
            .addServer(
                swaggerConfig.servers[1].url,
                swaggerConfig.servers[1].description,
            )
            .setTitle(swaggerConfig.title || 'Nestjs')
            .setDescription(
                swaggerConfig.description || 'The nestjs API description',
            )
            .setVersion(swaggerConfig.version || '1.O')
            .build();

        console.log('swagger config', swaggerConfig.servers);
        const document = SwaggerModule.createDocument(app, options);

        SwaggerModule.setup(swaggerConfig.path || 'api', app, document);
    }

    // CORS
    if (corsConfig.enabled) {
        app.enableCors();
    }

    await app.listen(process.env.PORT || nestConfig.port || 3000);
}
bootstrap();
