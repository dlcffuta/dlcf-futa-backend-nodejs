import { NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';

import { IPermission } from '../../interfaces';
import { PermissionModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const updatePermissionService = async (
  id: string,
  payload: UpdateQuery<IPermission>,
  next: NextFunction,
): Promise<void | IPermission> => {
  try {
    const permission = await PermissionModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
    if (!permission) {
      return next(new CustomError(404, 'General', 'Permission ID not found'));
    }
    return permission;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
