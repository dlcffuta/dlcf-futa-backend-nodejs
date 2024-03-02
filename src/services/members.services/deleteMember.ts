import { NextFunction } from 'express';
import { deleteUrl } from '../../utils/cloudinary';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteMemberService = async (id: string, next: NextFunction): Promise<void | String> => {
  try {
    const existingMember = await MemberModel.findById({ _id: id });
    if (!existingMember) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
    }
    await deleteUrl(existingMember.imageUrl);
    await MemberModel.findByIdAndDelete({ _id: id });
    return 'Member deleted successfully!';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
