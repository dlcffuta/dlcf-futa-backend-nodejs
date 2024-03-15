import { NextFunction } from 'express';

import { IHallRepresentative } from '../../interfaces';
import { HallRepresentativeModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getHallRepresentativeByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IHallRepresentative> => {
  try {
    const hallRepresentative = await HallRepresentativeModel.findById({ _id: id });
    if (!hallRepresentative) {
      return next(new CustomError(400, 'General', "HallRepresentative ID is doesn't exist!"));
    }
    return hallRepresentative;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};