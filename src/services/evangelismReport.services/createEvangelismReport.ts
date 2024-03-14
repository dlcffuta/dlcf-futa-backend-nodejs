import { NextFunction } from 'connect';
import { IEvengelismReport } from 'interfaces';
import { EvangelismReportModel, HallModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const createEvangelismReportService = async (
  payload: IEvengelismReport,
  next: NextFunction,
): Promise<void | IEvengelismReport> => {
  try {
    const existingHall = await HallModel.exists({ name: payload.hallId });
    if (!existingHall) {
      return next(new CustomError(400, 'General', 'Hall does not exist'));
    }
    console.log(existingHall);
    const newReport = await EvangelismReportModel.create({
      hallId: existingHall._id,
      numberOfMembersWhoWent: payload.numberOfMembersWhoWent,
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
