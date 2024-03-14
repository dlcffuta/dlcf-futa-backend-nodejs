import { NextFunction } from 'express';

import { IPmPrayerReport } from 'interfaces';
import { PmPrayerReportModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const updatePmPrayerReportService = async (
  id: string,
  payload: IPmPrayerReport,
  next: NextFunction,
): Promise<void | IPmPrayerReport> => {
  try {
    const existingPmPrayerReport = await PmPrayerReportModel.findById({ _id: id });
    if (!existingPmPrayerReport) {
      return next(new CustomError(400, 'General', "PmPrayerReport ID doesn't exist!"));
    }

    const updatedPmPrayerReport = await PmPrayerReportModel.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return updatedPmPrayerReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
