import { NextFunction } from 'express';

import { IPmPrayerReport } from 'interfaces';
import { PmPrayerReportModel } from '../../../models';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const getPmPrayerReportByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IPmPrayerReport> => {
  try {
    const PmPrayerReport = await PmPrayerReportModel.findById({ _id: id })
      .populate('hallId')
      .exec();
    if (!PmPrayerReport) {
      return next(new CustomError(400, 'General', "Evening prayer report ID doesn't exist!"));
    }
    return PmPrayerReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
