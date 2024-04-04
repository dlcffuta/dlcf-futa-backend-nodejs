import { NextFunction } from 'express';
import { UnitModel } from '../../models';
import { IUnit } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const createUnitService = async (payload: IUnit, next: NextFunction) => {
  try {
    const unitExist = await UnitModel.findOne({ unitType: payload.unitType });
    if (unitExist) {
      return next(
        new CustomError(400, 'General', `Unit with the name ${payload.unitType} already exist`),
      );
    }

    const newUnit = await UnitModel.create({
      unitType: payload.unitType,
      unitDescription: payload.unitDescription,
    });
    await newUnit.save();
    return newUnit;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
