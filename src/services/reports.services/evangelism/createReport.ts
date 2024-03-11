import { NextFunction } from 'connect';
import { IEvangelismReport } from 'interfaces';
import { EvangelismReportModel, HallModel } from '../../../models';

import { CustomError } from 'utils/response/custom-error/customError';

export const createEvangelismReportService = async (
  payload: IEvangelismReport,
  next: NextFunction,
): Promise<void | IEvangelismReport> => {
  try {
    const existingHall = await HallModel.exists({ _id: payload.hallId });
    if (!existingHall) {
      return next(new CustomError(400, 'General', 'Hall does not exist'));
    }
    const newReport = await EvangelismReportModel.create({
      hallId: payload.hallId,
      numberOfMembersWhoWent: payload,
      date: payload.date,
      nameOfPeopleMinisteredTo: {
        firstName: payload.nameOfPeopleMinisteredTo.firstName,
        lastName: payload.nameOfPeopleMinisteredTo.lastName,
        phoneNumber: payload.nameOfPeopleMinisteredTo.phoneNumber,
        status: payload.nameOfPeopleMinisteredTo.status,
      },
    });
    return newReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
