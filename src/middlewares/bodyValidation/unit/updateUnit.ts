import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { IUnit, EUnitType } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const updateUnitSchema: joi.ObjectSchema<IUnit> = joi.object({
  unit: joi.object().valid(...Object.values(EUnitType)),
  unitDescription: joi.string(),
});

export const updateUnit = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: IUnit = req.body;
    await updateUnitSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
