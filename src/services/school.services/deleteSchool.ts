import { NextFunction } from 'express';

import { SchoolModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteSchoolService = async (
  schoolId: string,
  next: NextFunction,
): Promise<string | void> => {
  try {
    const school = await SchoolModel.findById(schoolId);
    if (!school) {
      return next(new CustomError(409, 'General', `School with id ${schoolId} does not exist`));
    }
    await SchoolModel.findByIdAndDelete({ _id: schoolId });
    return 'School deleted successfully';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
