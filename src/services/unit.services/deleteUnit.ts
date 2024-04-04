import { NextFunction } from 'express';

import { UnitModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteUnitService = async (
  unitId: string,
  next: NextFunction,
): Promise<string | void> => {
  try {
    const unit = await UnitModel.findById(unitId);
    if (!unit) {
      return next(new CustomError(409, 'General', `Unit with id ${unitId} does not exist`));
    }
    await UnitModel.findByIdAndDelete({ _id: unitId });
    return 'Unit deleted successfully';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
