import { NextFunction } from 'connect';
import { IPmPrayerReport } from 'interfaces';
import { PmPrayerReportModel } from '../../../models';

import { CustomError } from 'utils/response/custom-error/customError';

export const deletePmPrayerReportService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingPmPrayerReport = await PmPrayerReportModel.findById({ _id: id });
    if (!existingPmPrayerReport) {
      return next(new CustomError(400, 'General', 'Evening prayer report does not exist'));
    }
    await PmPrayerReportModel.findOneAndDelete({ _id: id });
    return `Report for evening prayer (${existingPmPrayerReport.date}) deleted successfully`;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
