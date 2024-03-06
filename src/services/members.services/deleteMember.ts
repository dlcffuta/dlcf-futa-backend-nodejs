import { NextFunction } from 'express';

import { MemberModel } from '../../models';
import { deleteUrl } from '../../utils/cloudinary';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteMemberService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingMember = await MemberModel.findById({ _id: id });
    if (!existingMember) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
    }
    await deleteUrl(existingMember.imageUrl.path);
    await MemberModel.findByIdAndDelete({ _id: id });
    return 'Member deleted successfully!';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
