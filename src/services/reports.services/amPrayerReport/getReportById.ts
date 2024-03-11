import { NextFunction } from 'express';

import { IAmPrayerReport } from 'interfaces';
import { AmPrayerReportModel } from '../../../models';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const getAmPrayerReportByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IAmPrayerReport> => {
  try {
    const AmPrayerReport = await AmPrayerReportModel.findById({ _id: id })
      .populate('hallId')
      .exec();
    if (!AmPrayerReport) {
      return next(new CustomError(400, 'General', "Morning prayer report ID doesn't exist!"));
    }
    return AmPrayerReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
