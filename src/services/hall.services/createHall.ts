import { NextFunction } from 'express';
import { IHall } from 'interfaces';
import { HallModel, CentreModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const createHallService = async (
  payload: IHall,
  next: NextFunction,
): Promise<void | IHall> => {
  try {
    const existingHall = await HallModel.exists({ name: payload.name });
    if (existingHall) {
      return next(new CustomError(400, 'General', 'Hall already exists'));
    }
    const centre = await CentreModel.findOne({ name: payload.centre });
    if (!centre) {
      return next(new CustomError(404, 'General', 'Centre does not exist'));
    }

    const newHall = await HallModel.create({
      name: payload.name,
      centre: centre._id,
      location: payload.location,
    });
    centre.halls.push(newHall._id);
    return newHall;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
