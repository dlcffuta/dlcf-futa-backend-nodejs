import { NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';

import { IHallRepresentative } from '../../interfaces';
import { HallRepresentativeModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const updateHallRepresentativeService = async (
  id: string,
  payload: UpdateQuery<IHallRepresentative>,
  next: NextFunction,
): Promise<void | IHallRepresentative> => {
  try {
    const existingHallRepresentative = await HallRepresentativeModel.findById({ _id: id });
    if (!existingHallRepresentative) {
      return next(new CustomError(400, 'General', "HallRepresentative ID is doesn't exist!"));
    }
    const updatedHallRepresentative = await HallRepresentativeModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return updatedHallRepresentative;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
