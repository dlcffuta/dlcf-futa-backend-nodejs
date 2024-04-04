import { NextFunction } from 'express';

import { UnitModel } from '../../models';
import { IUnit } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const getUnitByIdService = async (id: string, next: NextFunction): Promise<IUnit | void> => {
  try {
    const unit = await UnitModel.findById(id);
    if (!unit) {
      return next(new CustomError(409, 'General', `Unit with id '${id}' does not exist`));
    }
    return unit;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
