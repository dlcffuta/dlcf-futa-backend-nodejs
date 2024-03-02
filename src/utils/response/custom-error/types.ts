export type ErrorResponseBody = {
    errorType: string;
    errorMessage: string;
    errorRaw?: any;
}

export type ErrorType = "Raw" | "General" | "Validation";