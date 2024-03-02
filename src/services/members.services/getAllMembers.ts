import { NextFunction } from 'express';

import { IMember, ICustomInferface } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllMemberService = async (
    query: ICustomInferface,
    option: ICustomInferface,
  next: NextFunction,
): Promise<void | IMember> => {
  try {
    const member = await MemberModel.findById({ query });
    if (!member) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
    }
    return member;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};