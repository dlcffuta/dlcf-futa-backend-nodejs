import { NextFunction } from 'express';

import { SchoolModel } from '../../models';
import { ISchool } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const getSchoolByIdService = async (
  id: string,
  next: NextFunction,
): Promise<ISchool | void> => {
  try {
    const school = await SchoolModel.findById(id);
    if (!school) {
      return next(new CustomError(409, 'General', `School with id '${id}' does not exist`));
    }
    return school;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
