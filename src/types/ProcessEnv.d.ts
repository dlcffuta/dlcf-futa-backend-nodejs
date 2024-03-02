declare namespace NodeJS { 
    export interface ProcessEnv { 
        NODE_ENV: string;
        PORT: string;
        MONGO_URI: string;
        JWT_SECRET: string;
        JWT_EXPIRATION: string;
        BACKEND_BASE_URL: string;
    }
}