import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { ISchool, ESchool, ESchoolCode } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createSchoolSchema: joi.ObjectSchema<ISchool> = joi.object({
  schoolCode: joi
    .string()
    .required()
    .valid(...Object.values(ESchoolCode)),
  school: joi
    .object()
    .required()
    .valid(...Object.values(ESchool)),
  department: joi.object().required(),
});

export const addSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: ISchool = req.body;
    await createSchoolSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
