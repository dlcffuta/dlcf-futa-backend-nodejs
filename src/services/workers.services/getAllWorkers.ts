import { NextFunction } from 'express';
import { IWorker, ICustomInterface } from '../../interfaces';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllWorkerService = async (
  query: ICustomInterface,
  option: ICustomInterface,
  next: NextFunction,
): Promise<void | Object> => {
  try {
    let { page, limit } = option;
    const worker = await WorkerModel.find({ query })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await WorkerModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const result = {
      limit,
      worker,
      totalPages,
      currentPage: page,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
