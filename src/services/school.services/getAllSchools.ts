import { NextFunction } from 'express';

import { SchoolModel } from '../../models';
import { ICustomInterface } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllSchoolService = async (
  query: ICustomInterface,
  options: ICustomInterface,
  next: NextFunction,
): Promise<object | void> => {
  try {
    const { limit, page } = options as { limit: number; page: number };
    const schools = await SchoolModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await SchoolModel.countDocuments(query);

    const result = {
      limit,
      schools,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
