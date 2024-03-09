import { NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';

import { SchoolModel } from '../../models';
import { ISchool } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const updateSchoolService = async (
  schoolId: string,
  payload: UpdateQuery<ISchool>,
  next: NextFunction,
): Promise<ISchool | void> => {
  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) {
      return next(new CustomError(409, 'General', `School with id ${schoolId} does not exist`));
    }
    const updatedSchool = await SchoolModel.findByIdAndUpdate({ _id: schoolId }, payload, {
      new: true,
    });
    return updatedSchool;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
