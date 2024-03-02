import { NextFunction } from 'express';

import { IMember, MemberInputDTO } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const createMemberService = async (payload: MemberInputDTO, next: NextFunction): Promise<void | IMember> => {
  try {
    const newMember = await MemberModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      department: payload.department,
      school: payload.school,
      level: payload.level,
      centre: payload.centre,
      hall: payload.hall,
    });
    return newMember;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
