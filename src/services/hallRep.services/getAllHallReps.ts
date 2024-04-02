import { NextFunction } from 'express';

import { ICustomInterface } from '../../interfaces';
import { HallRepresentativeModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllHallRepresentativeService = async (
  query: ICustomInterface,
  option: ICustomInterface,
  next: NextFunction,
): Promise<void | object> => {
  try {
    const { page, limit } = option as { page: number; limit: number };
    const hallRep = await HallRepresentativeModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await HallRepresentativeModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    const result = {
      limit,
      hallRep,
      totalPages,
      currentPage: page,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
