import { NextFunction } from 'express';

import { EGender } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const totalMemberService = async (next: NextFunction): Promise<void | object> => {
  try {
    const totalBrother = await MemberModel.countDocuments({ gender: EGender.MALE });
    const totalSister = await MemberModel.countDocuments({ gender: EGender.FEMALE });
    const total = await MemberModel.countDocuments();
    const result = {
      totalBrother,
      totalSister,
      totalMember: total,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
