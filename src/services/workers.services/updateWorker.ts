import { NextFunction } from 'express';

import { IWorker } from '../../interfaces';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';
import { UpdateQuery } from 'mongoose';

export const updateWorkerService = async (
  id: string,
  payload: UpdateQuery<IWorker>,
  next: NextFunction,
): Promise<void | IWorker> => {
  try {
    const existingWorker = await WorkerModel.findById({ _id: id });
    if (!existingWorker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
    }
    const updatedWorker = await WorkerModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return updatedWorker;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};