import { NextFunction } from 'express';
import { IWorker, ICustomInferface } from '../../interfaces';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllWorkerService = async (
    query: ICustomInferface,
    option: ICustomInferface,
  next: NextFunction,
): Promise<void | IWorker> => {
  try {
      const Worker = await WorkerModel.findById({ query });
    if (!Worker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
    }
    return Worker;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};