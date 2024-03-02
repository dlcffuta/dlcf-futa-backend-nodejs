import { ErrorResponseBody, ErrorType } from "./types";

export class CustomError extends Error { 
    private statusCode: number;
    private errorType: string;
    private errorMessage: string;
    private errorRaw?: any;

    constructor(statusCode: number, errorType: ErrorType, errorMessage: string, errorRaw?: any) { 
        super(errorMessage);
        this.statusCode = statusCode;
        this.errorType = errorType;
        this.errorMessage = errorMessage;
        this.errorRaw = errorRaw;

    }

    get getStatusCode(): number { 
        return this.statusCode;
    }

    get getResponseBody(): ErrorResponseBody { 
        return {
            errorType: this.errorType,
            errorMessage: this.errorMessage,
            errorRaw: this.errorRaw
        };
    }
}