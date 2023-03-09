import { Config } from './config.interface';

export default (): Config => ({
    nest: {
        port: 3000,
    },
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
    },
    swagger: {
        servers: [
            {
                url: process.env.LOCAL_URL,
                description: 'LOCAL',
            },
            {
                url: process.env.DEV_URL,
                description: 'DEV',
            },
        ],
        enabled: true,
        title: 'Nestjs FTW',
        description: 'The nestjs API description',
        version: '0.1',
        path: 'api',
    },
});
