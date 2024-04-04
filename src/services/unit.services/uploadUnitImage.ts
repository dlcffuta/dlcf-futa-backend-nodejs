import { NextFunction } from 'express';

import { IUnit } from '../../interfaces';
import { UnitModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const uploadUnitImagePictureService = async (
  id: string,
  image: { path: string; filename: string },
  next: NextFunction,
): Promise<void | IUnit> => {
  try {
    const existingUnit = await UnitModel.findById({ _id: id });
    if (!existingUnit) {
      return next(new CustomError(400, 'General', "Unit ID is doesn't exist!"));
    }
    const uploadUnitImagePicture = await UnitModel.findByIdAndUpdate(
      { _id: id },
      {
        unitImageUrl: {
          path: image.path,
          fileName: image.filename,
        },
      },
      { new: true },
    );
    return uploadUnitImagePicture;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
