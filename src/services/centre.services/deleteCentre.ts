import { NextFunction } from 'express';

import { CentreModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteCentreService = async (
  centreId: string,
  next: NextFunction,
): Promise<string | void> => {
  try {
    const centre = await CentreModel.findById(centreId);
    if (!centre) {
      return next(new CustomError(409, 'General', `Centre with id ${centreId} does not exist`));
    }
    await CentreModel.findByIdAndDelete({ _id: centreId });
    return 'Centre deleted successfully';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
