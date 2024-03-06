export type ErrorResponseBody = {
  errorType: string;
  errorMessage: string;
  errorRaw?: unknown;
};

export type ErrorType = 'Raw' | 'General' | 'Validation';
