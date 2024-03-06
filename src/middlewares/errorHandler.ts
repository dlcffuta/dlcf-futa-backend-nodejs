import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/customError';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  return res.status(err.getStatusCode).json(err.getResponseBody);
};
