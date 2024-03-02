import { NextFunction } from 'express';

import { IMember } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const uploadMemberProfilePictureService = async (
  id: string,
  image: { path: string; filename: string; },
  next: NextFunction,
): Promise<void | IMember> => {
  try {
    const existingMember = await MemberModel.findById({ _id: id });
    if (!existingMember) {
      return next(new CustomError(400, 'General', "Member ID is doesn't exist!"));
      }
    const uploadProfilePicture = await MemberModel.findByIdAndUpdate({ _id: id }, { imageUrl: {
        path: image.path,
        fileName: image.filename,
    } }, { new: true });
    return uploadProfilePicture;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
