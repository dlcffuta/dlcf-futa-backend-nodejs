import { NextFunction } from 'express';

import { CentreModel } from '../../models';
import { ICentre } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const getCentreByIdService = async (
  id: string,
  next: NextFunction,
): Promise<ICentre | void> => {
  try {
    const centre = await CentreModel.findById(id).populate('halls').exec();
    if (!centre) {
      return next(new CustomError(409, 'General', `Centre with id ${id} does not exist`));
    }
    return centre;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
