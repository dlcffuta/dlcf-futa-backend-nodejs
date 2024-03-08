import { NextFunction } from 'express';

import { CentreModel } from '../../models';
import { ICentre } from '../../interfaces';

import { CustomError } from '../../utils/response/custom-error/customError';

export const createCentreService = async (payload: ICentre, next: NextFunction) => {
  try {
    const centreExist = await CentreModel.findOne({ name: payload.name });
    if (centreExist) {
      return next(
        new CustomError(400, 'General', `Centre with the name ${payload.name} already exist`),
      );
    }

    const newCentre = await CentreModel.create({
      name: payload.name,
        location: payload.location,
        dlcfCampus: payload.dlcfCampus,
    });
    return newCentre;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal Server Error', error.message));
  }
};
