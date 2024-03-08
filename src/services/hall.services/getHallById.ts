import { NextFunction } from 'express';

import { IHall } from '../../interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getHallByIdService = async (id: string, next: NextFunction): Promise<void | IHall> => {
  try {
    const hall = await HallModel.findById({ _id: id });
    if (!hall) {
      return next(new CustomError(400, 'General', "Hall ID doesn't exist!"));
    }
    return hall;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
