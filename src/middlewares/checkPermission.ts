import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/response/custom-error/customError';
import { ICustomInterface } from '../interfaces';
import { PermissionModel } from '../models';
import { getPermissionByIdService } from '../services/permission.services';

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
    const permission = await getPermissionByIdService(jwtPayload.permission, next);
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

    for (const each_permission in permission) {
      if (pathPrefix.startsWith(each_permission.substring(0, 2))) {
        if (permission[each_permission][methodAction]) {
          return next();
        }
        return next(new CustomError(403, 'General', 'Access denied'));
      }
    }

    return next();
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
