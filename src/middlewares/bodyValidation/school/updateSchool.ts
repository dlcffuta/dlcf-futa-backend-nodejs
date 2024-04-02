import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { ISchool, ESchool, ESchoolCode } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const updateSchoolSchema: joi.ObjectSchema<ISchool> = joi.object({
  schoolCode: joi.string().valid(...Object.values(ESchoolCode)),
  school: joi.object().valid(...Object.values(ESchool)),
  department: joi.array(),
});

export const updateSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: ISchool = req.body;
    await updateSchoolSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
