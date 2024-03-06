import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { MemberInputDTO } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createMemberSchema: joi.ObjectSchema<MemberInputDTO> = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string().required(),
  department: joi.string().required(),
  school: joi.string().required(),
  level: joi.string().required(),
  dlcfCampus: joi.string().required(),
  centre: joi.string().required(),
  hall: joi.string().required(),
});

export const registerMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: MemberInputDTO = req.body;
    await createMemberSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
