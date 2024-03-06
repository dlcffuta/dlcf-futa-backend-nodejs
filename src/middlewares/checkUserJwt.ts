import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { ADMIN_JWT_SECRET } from '../config';
import { JwtPayload } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/custom-error/customError';

export const checkUserJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.get('Authorization').split(' ')[1];
    if (!token) {
      const customError = new CustomError(400, 'General', 'Authorization header not provided');
      return next(customError);
    }

    const jwtPayload = jwt.verify(token, ADMIN_JWT_SECRET as string) as { [key: string]: unknown };
    // Remove iat and exp from jwtPayload
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
    return next();
  } catch (error) {
    return next(new CustomError(401, 'Validation', 'JWT error', error.message));
  }
};

// refresh and send a new token on every request
// export const refreshToken = (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // Refresh and send a new token on every request
//     let jwtPayload: { [key: string]: any };
//     jwtPayload = req.jwtPayload;
//     const newToken = createJwtToken(jwtPayload as JwtPayload);
//     res.setHeader('token', `Bearer ${newToken}`);
//     return next();
//   } catch (err) {
//     const customError = new CustomError(400, 'Raw', "Token can't be created", null, err);
//     return next(customError);
//   }
// };
