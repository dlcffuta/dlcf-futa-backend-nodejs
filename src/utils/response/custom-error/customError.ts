import { ErrorResponseBody } from "./types";

export class CustomError extends Error { 
    private statusCode: number;
    private errorMessage: string;
    private errorRaw?: any;

    constructor(statusCode: number, errorMessage: string, errorRaw?: any) { 
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorMessage = errorMessage;
        this.errorRaw = errorRaw;
    }

    get getStatusCode(): number { 
        return this.statusCode;
    }

    get getResponseBody(): ErrorResponseBody { 
        return {
            errorMessage: this.errorMessage,
            errorRaw: this.errorRaw
        };
    }
}