import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { IHall, ECentre, EHall } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createHallSchema: joi.ObjectSchema<IHall> = joi.object({
  centre: joi
    .string()
    .required()
    .valid(...Object.values(ECentre)),
  name: joi
    .string()
    .required()
    .valid(...Object.values(EHall)),
  location: joi.string().required(),
});

export const addHall = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: IHall = req.body;
    await createHallSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
