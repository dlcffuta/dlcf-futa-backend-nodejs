import { NextFunction } from 'express';
import { IHall } from 'interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const createHallService = async (
  payload: IHall,
  next: NextFunction,
): Promise<void | IHall> => {
  try {
    const existingHall = await HallModel.exists({ name: payload.name, centre: payload.centre });
    if (existingHall) {
      return next(new CustomError(400, 'General', 'Hall already exists'));
    }
    const newHall = await HallModel.create({
      name: payload.name,
      centre: payload.centre,
      location: payload.location,
    });
    return newHall;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
