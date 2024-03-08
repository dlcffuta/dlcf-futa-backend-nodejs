import { NextFunction } from 'express';
import { ICustomInterface, IHall } from 'interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllHallService = async (
  query: ICustomInterface,
  option: ICustomInterface,
  next: NextFunction,
): Promise<void | object> => {
  try {
    const { page, limit } = option as { page: number; limit: number };
    const hall = await HallModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await HallModel.countDocuments(query);
    const totalPages = Math.floor(total / limit);
    const result = {
      limit,
      hall,
      totalPages,
      currentPage: page,
    };

    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
