import { NextFunction } from 'express';

import { IWorker, WorkerInputDTO } from '../../interfaces';
import { WorkerModel } from '../../models';
import { EmailService } from '../../utils/notification';
import { CustomError } from '../../utils/response/custom-error/customError';

const emailService = new EmailService();

export const createWorkerService = async (
  payload: WorkerInputDTO,
  next: NextFunction,
): Promise<void | IWorker> => {
  try {
    const existingWorker = await WorkerModel.exists({ email: payload.email });
    if (existingWorker) {
      return next(new CustomError(400, 'General', 'Worker already exists'));
    }

    const newWorker = await WorkerModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      department: payload.department,
      school: payload.school,
      level: payload.level,
      centre: payload.centre,
      hall: payload.hall,
      dlcfCampus: payload.dlcfCampus,
      unit: payload.unit,
    });

    await emailService.welcome(payload.email, payload.firstName);
    return newWorker;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
