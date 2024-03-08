import { NextFunction } from 'express';

import { CentreModel } from '../../models';
import { ICustomInterface } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllCentreService = async (
  query: ICustomInterface,
  options: ICustomInterface,
  next: NextFunction,
): Promise<object | void> => {
  try {
    const { limit, page } = options as { limit: number; page: number };
    const centres = await CentreModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await CentreModel.countDocuments(query);

    const result = {
      limit,
      centres,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
