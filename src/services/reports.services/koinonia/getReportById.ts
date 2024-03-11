import { NextFunction } from 'express';

import { IKoinoniaReport } from 'interfaces';
import { KoinoniaReportModel } from 'models/';
import { CustomError } from 'utils/response/custom-error/customError';

export const getKoinoniaReportByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IKoinoniaReport> => {
  try {
    const KoinoniaReport = await KoinoniaReportModel.findById({ _id: id }).populate('Hall').exec();
    if (!KoinoniaReport) {
      return next(new CustomError(400, 'General', "Koinonia report ID doesn't exist!"));
    }
    return KoinoniaReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
