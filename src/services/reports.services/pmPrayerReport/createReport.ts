import { NextFunction } from 'connect';
import { IPmPrayerReport } from 'interfaces';
import { PmPrayerReportModel, HallModel } from '../../../models';

import { CustomError } from '../../../utils/response/custom-error/customError';

export const createPmPrayerReportService = async (
  payload: IPmPrayerReport,
  next: NextFunction,
): Promise<void | IPmPrayerReport> => {
  try {
    const existingHall = await HallModel.exists({ name: payload.hallId });
    if (!existingHall) {
      return next(new CustomError(400, 'General', 'Hall does not exist'));
    }
    const newReport = await PmPrayerReportModel.create({
      hallId: existingHall._id,
      numberOfBrother: payload.numberOfBrother,
      numberOfSister: payload.numberOfSister,
      numberOfFirstTimer: payload.numberOfFirstTimer,
      numberOfConvert: payload.numberOfConvert,
      date: payload.date,
      testimony: payload.testimony,
      totalNumberOfAttendee: payload.totalNumberOfAttendee,
    });
    return newReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
