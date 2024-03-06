import { NextFunction } from 'express';

import { IMember } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getMemberByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IMember> => {
  try {
    const member = await MemberModel.findById({ _id: id });
    if (!member) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
    }
    return member;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
