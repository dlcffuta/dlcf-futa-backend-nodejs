import { NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';

import { UnitModel } from '../../models';
import { IUnit } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const updateUnitService = async (
  id: string,
  payload: UpdateQuery<IUnit>,
  next: NextFunction,
): Promise<IUnit | void> => {
  try {
    const unit = await UnitModel.findById(id);
    if (!unit) {
      return next(new CustomError(409, 'General', `Unit with id ${id} does not exist`));
    }
    const updatedUnit = await UnitModel.findByIdAndUpdate({ _id: id }, payload, {
      new: true,
    });
    return updatedUnit;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
