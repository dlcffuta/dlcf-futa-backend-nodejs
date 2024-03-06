import { Request, Response, NextFunction } from 'express';
import joi from 'joi';

import { WorkerInputDTO } from '../../../interfaces';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const createWorkerSchema: joi.ObjectSchema<WorkerInputDTO> = joi.object({
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
  unit: joi.string().required(),
  residentialAddress: joi.string().required()
});

export const addWorker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regististrationBody: WorkerInputDTO = req.body;
    await createWorkerSchema.validateAsync(regististrationBody);
    next();
  } catch (error) {
    return next(new CustomError(400, 'Validation', error.message));
  }
};
