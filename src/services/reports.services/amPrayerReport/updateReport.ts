import { NextFunction } from 'express';

import { IAmPrayerReport } from 'interfaces';
import { AmPrayerReportModel } from '../../../models';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const updateAmPrayerReportService = async (
  id: string,
  payload: IAmPrayerReport,
  next: NextFunction,
): Promise<void | IAmPrayerReport> => {
  try {
    const existingAmPrayerReport = await AmPrayerReportModel.findById({ _id: id });
    if (!existingAmPrayerReport) {
      return next(new CustomError(400, 'General', "AmPrayerReport ID doesn't exist!"));
    }

    const updatedAmPrayerReport = await AmPrayerReportModel.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return updatedAmPrayerReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
