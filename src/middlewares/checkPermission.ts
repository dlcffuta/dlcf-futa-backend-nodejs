import { NextFunction, Request, Response } from 'express';

import { getPermissionByIdService } from '../services/permission.services';
import { CustomError } from '../utils/response/custom-error/customError';

export const checkPermission = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { jwtPayload, method, originalUrl } = req;

    if (!jwtPayload || !jwtPayload.permission) {
      return next(new CustomError(401, 'General', 'Unauthorized'));
    }
    const permission: { [key: string]: any } | void = await getPermissionByIdService(
      jwtPayload.permission,
      next,
    );
    if (!permission || typeof permission !== 'object') {
      return next(new CustomError(401, 'General', 'Unauthorized'));
    }

    const mapMethod = {
      GET: 'read',
      POST: 'create',
      PUT: 'update',
      PATCH: 'update',
      DELETE: 'delete',
    };
    const methodAction = mapMethod[method];
    const pathPrefix = originalUrl.split('/')[1];

    if (pathPrefix === 'dlcfcampus') { 
      let pathPrefix2 = pathPrefix.replace('c', 'C')
      if (!(pathPrefix2 in permission)) {
        return next(new CustomError(403, 'General', 'Access denied'));
      }
      if (!permission[pathPrefix2][methodAction]) {
        return next(new CustomError(403, 'General', 'Access denied'));
      }
    }

    if (!(pathPrefix in permission)) {
      return next(new CustomError(403, 'General', 'Access denied'));
    }
    if (!permission[pathPrefix][methodAction]) {
      return next(new CustomError(403, 'General', 'Access denied'));
    }
  
    return next();
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
