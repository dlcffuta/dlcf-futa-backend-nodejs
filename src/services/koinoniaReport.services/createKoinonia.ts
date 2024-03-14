import { NextFunction } from 'connect';
import { IKoinoniaReport } from 'interfaces';
import { KoinoniaReportModel, HallModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const createKoinoniaReportService = async (
  payload: IKoinoniaReport,
  next: NextFunction,
): Promise<void | IKoinoniaReport> => {
  try {
    const existingHall = await HallModel.exists({ name: payload.hallId });
    if (!existingHall) {
      return next(new CustomError(400, 'General', 'Hall does not exist'));
    }
    const newReport = await KoinoniaReportModel.create({
      hallId: existingHall._id,
      numberOfBrother: payload.numberOfBrother,
      numberOfSister: payload.numberOfSister,
      numberOfFirstTimer: payload.numberOfFirstTimer,
      numberOfConvert: payload.numberOfConvert,
      numberOfKoinoniaPoint: payload.numberOfKoinoniaPoint,
      date: payload.date,
      testimony: payload.testimony,
      totalNumberOfAttendee: payload.totalNumberOfAttendee,
    });
    return newReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
