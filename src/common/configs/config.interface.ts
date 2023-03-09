export interface Config {
    nest: NestConfig;
    cors: CorsConfig;
    swagger: SwaggerConfig;
}

export interface NestConfig {
    port: number;
}

export interface CorsConfig {
    origin: string;
    methods: string[];
    allowedHeaders: string[];
}

export interface SwaggerConfig {
    servers: ServerConfig[];
    enabled: boolean;
    title: string;
    description: string;
    version: string;
    path: string;
}

export interface ServerConfig {
    url: string;
    description?: string;
}
