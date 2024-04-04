import { NextFunction } from 'express';

import { IWorker, WorkerInputDTO } from '../../interfaces';
import { WorkerModel, CentreModel, HallModel, UnitModel } from '../../models';
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

    const centre = await CentreModel.findOne({ name: payload.centre });
    if (!centre) {
      return next(new CustomError(404, 'General', 'Centre does not exist'));
    }

    const hall = await HallModel.findOne({ name: payload.hall });
    if (!hall) {
      return next(new CustomError(404, 'General', 'Hall does not exist'));
    }

    const unit = await UnitModel.findOne({ unitType: payload.unit });
    if (!unit) {
      return next(new CustomError(404, 'General', 'Unit does not exist'));
    }

    const newWorker = await WorkerModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      department: payload.department,
      school: payload.school,
      level: payload.level,
      centre: centre._id,
      gender: payload.gender,
      hall: hall._id,
      dlcfCampus: payload.dlcfCampus,
      residentialAddress: payload.residentialAddress,
      unit: unit._id,
    });

    await emailService.welcome(payload.email, payload.firstName);
    return newWorker;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
