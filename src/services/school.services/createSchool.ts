import { NextFunction } from 'express';

import { SchoolModel } from '../../models';
import { ISchool } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const createSchoolService = async (payload: ISchool, next: NextFunction) => {
  try {
    const schoolExist = await SchoolModel.findOne({ school: payload.school });
    if (schoolExist) {
      return next(
        new CustomError(400, 'General', `School with the name ${payload.school} already exist`),
      );
    }

    const newSchool = await SchoolModel.create({
      school: payload.school,
      schoolCode: payload.schoolCode,
    });
    payload.department.forEach(async (dept) => {
      newSchool.department.push({
        slug: dept.slug,
        name: dept.name,
      });
    });
    await newSchool.save();
    return newSchool;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
