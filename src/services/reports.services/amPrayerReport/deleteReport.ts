import { NextFunction } from 'connect';
import { IAmPrayerReport } from 'interfaces';
import { AmPrayerReportModel } from '../../../models';

import { CustomError } from '../../../utils/response/custom-error/customError';

export const deleteAmPrayerReportService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingAmPrayerReport = await AmPrayerReportModel.findById({ _id: id });
    if (!existingAmPrayerReport) {
      return next(new CustomError(400, 'General', 'Morning prayer report does not exist'));
    }
    await AmPrayerReportModel.findOneAndDelete({ _id: id });
    return `Report for morning prayer (${existingAmPrayerReport.date}) deleted successfully`;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
