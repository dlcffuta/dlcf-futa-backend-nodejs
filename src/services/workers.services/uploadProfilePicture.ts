import { NextFunction } from 'express';

import { IWorker } from '../../interfaces';
import { WorkerModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const uploadWorkerProfilePictureService = async (
  id: string,
  image: string,
  next: NextFunction,
): Promise<void | IWorker> => {
  try {
    const existingWorker = await WorkerModel.findById({ _id: id });
    if (!existingWorker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
      }
    const uploadProfilePicture = await WorkerModel.findByIdAndUpdate({ _id: id }, { imageUrl: image }, { new: true });
    return uploadProfilePicture;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};