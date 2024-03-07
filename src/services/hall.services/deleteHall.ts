import { NextFunction } from 'express';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteHallService = async (id: string, next: NextFunction): Promise<void | String> => {
  try {
    const existingHall = await HallModel.findById({ _id: id });
    if (!existingHall) {
      return next(new CustomError(400, 'General', "Hall ID doesn't exist!"));
    }

    await HallModel.findByIdAndDelete({ _id: id });
    return `${existingHall.name} deleted successfully`;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
