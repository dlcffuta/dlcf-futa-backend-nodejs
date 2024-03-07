import { NextFunction } from 'express';
import { ICustomInferface, IHall } from 'interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllHallService = async (
  query: ICustomInferface,
  option: ICustomInferface,
  next: NextFunction,
): Promise<void | IHall[]> => {
  try {
    console.log(query);
    const hall = await HallModel.find(query);
    if (hall.length<=0) {
      return next(new CustomError(400, 'General', "Halls doesn't exist!"));
    }
    return hall;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
