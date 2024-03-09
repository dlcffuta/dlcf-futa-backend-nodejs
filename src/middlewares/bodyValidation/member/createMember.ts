import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import {
  ECentre,
  EDlcfCampus,
  EGender,
  EHall,
  ELevel,
  ESchool,
  MemberInputDTO,
} from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createMemberSchema: joi.ObjectSchema<MemberInputDTO> = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  phoneNumber: joi.string().required(),
  gender: joi
    .string()
    .required()
    .valid(...Object.values(EGender)),
  department: joi.string().required(),
  school: joi
    .string()
    .required()
    .valid(...Object.values(ESchool)),
  level: joi
    .string()
    .required()
    .valid(...Object.values(ELevel)),
  dlcfCampus: joi
    .string()
    .required()
    .valid(...Object.values(EDlcfCampus)),
  centre: joi
    .string()
    .required()
    .valid(...Object.values(ECentre)),
  hall: joi
    .string()
    .required()
    .valid(...Object.values(EHall)),
  residentialAddress: joi.string().required(),
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
