import { NextFunction } from 'express';

import { IEvangelismReport } from 'interfaces';
import { EvangelismReportModel } from 'models/';
import { CustomError } from 'utils/response/custom-error/customError';

export const getEvangelismReportByIdService = async (
  id: string,
  next: NextFunction,
): Promise<void | IEvangelismReport> => {
  try {
    const EvangelismReport = await EvangelismReportModel.findById({ _id: id })
      .populate('Hall')
      .exec();
    if (!EvangelismReport) {
      return next(new CustomError(400, 'General', "Evangelism report ID doesn't exist!"));
    }
    return EvangelismReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
