import { NextFunction } from 'express';

import { PermissionModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getPermissionByIdService = async (id: string, next: NextFunction) => {
  try {
    const permission = await PermissionModel.findById(id);
    if (!permission) {
      return next(new CustomError(404, 'General', 'Permission ID not found'));
    }
    return permission;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
