import { NextFunction } from 'express';

import { IMember, MemberInputDTO } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const updateMemberService = async (
  id: string,
  payload: MemberInputDTO,
  next: NextFunction,
): Promise<void | IMember> => {
  try {
    const existingMember = await MemberModel.findById({ _id: id });
    if (!existingMember) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
    }
    const updatedMember = await MemberModel.findByIdAndUpdate({ _id: id }, { payload }, { new: true });
    return updatedMember;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
