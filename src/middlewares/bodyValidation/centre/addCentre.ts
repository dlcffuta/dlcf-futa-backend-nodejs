import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { EDlcfCampus, ICentre, ECentre } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createCentreSchema: joi.ObjectSchema<ICentre> = joi.object({
  name: joi
    .string()
    .required()
    .valid(...Object.values(ECentre)),
  halls: joi.string(),
  location: joi.string().required(),
  dlcfCampus: joi
    .string()
    .required()
    .valid(...Object.values(EDlcfCampus)),
});

export const addCentre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: ICentre = req.body;
    await createCentreSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
