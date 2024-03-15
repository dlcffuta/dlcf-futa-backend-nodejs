import { NextFunction } from 'express';

import { IHallRepresentative } from '../../interfaces';
import { HallRepresentativeModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const uploadHallRepProfilePictureService = async (
  id: string,
  image: string,
  next: NextFunction,
): Promise<void | IHallRepresentative> => {
  try {
    const existingHallRepresentative = await HallRepresentativeModel.findById({ _id: id });
    if (!existingHallRepresentative) {
      return next(new CustomError(400, 'General', "HallRepresentative ID is doesn't exist!"));
    }
    const uploadProfilePicture = await HallRepresentativeModel.findByIdAndUpdate(
      { _id: id },
        { hallRepImage: { path: image } },
      { new: true },
    );
    return uploadProfilePicture;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};