import { NextFunction } from 'express';
import { UpdateQuery } from 'mongoose';

import { CentreModel } from '../../models';
import { ICentre } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const updateCentreService = async (
  centreId: string,
  payload: UpdateQuery<ICentre>,
  next: NextFunction,
): Promise<ICentre | void> => {
  try {
    const centre = await CentreModel.findById(centreId);
    if (centre) {
      return next(new CustomError(409, 'General', `Centre with id ${centreId} does not exist`));
    }
    const updatedCentre = await CentreModel.findByIdAndUpdate({ _id: centreId }, payload, {
      new: true,
    });
    return updatedCentre;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
