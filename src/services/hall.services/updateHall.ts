import { NextFunction } from 'express';

import { IHall, HallInputDTO } from '../../interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const updateHallService = async (
  id: string,
  payload: HallInputDTO,
  next: NextFunction,
): Promise<void | IHall> => {
  try {
    const existingHall = await HallModel.findById({ _id: id });
    if (!existingHall) {
      return next(new CustomError(400, 'General', "Hall ID doesn't exist!"));
    }
    // console.log(payload)
    const updatedHall = await HallModel.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return updatedHall;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};