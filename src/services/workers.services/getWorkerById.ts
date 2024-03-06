import { NextFunction } from 'express';

import { IWorker } from '../../interfaces';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getWorkerByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IWorker> => {
  try {
    const worker = await WorkerModel.findById({ _id: id });
    if (!worker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
    }
    return worker;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
