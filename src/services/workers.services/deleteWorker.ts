import { NextFunction } from 'express';

import { WorkerModel } from '../../models';
import { deleteUrl } from '../../utils/cloudinary';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteWorkerService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingWorker = await WorkerModel.findById({ _id: id });
    if (!existingWorker) {
      return next(new CustomError(400, 'General', "Worker ID is doesn't exist!"));
    }
    await deleteUrl(existingWorker.imageUrl.path);
    await WorkerModel.findByIdAndDelete({ _id: id });
    return 'Worker deleted successfully!';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
