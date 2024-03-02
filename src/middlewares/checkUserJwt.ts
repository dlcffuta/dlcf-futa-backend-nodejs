import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/response/custom-error/customError";
import { createJwtToken } from "../utils/createJwtToken";
import { JWT_SECRET } from "../config";
import { JwtPayload } from "../utils/createJwtToken";

export const checkUserJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
      const token = req.get("Authorization").split(" ")[1];
    if (!token) {
      const customError = new CustomError(400, "General", "Authorization header not provided");
      next(customError);
    }

    let jwtPayload: { [key: string]: any };
    jwtPayload = jwt.verify(token, JWT_SECRET as string) as { [key: string]: any };
    // Remove iat and exp from jwtPayload
    ["iat", "exp"].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    req.jwtPayload = jwtPayload as JwtPayload;
    next();
  } catch (error) {
    next(new CustomError(401, "Validation", "JWT error", error.message));
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





