import { NextFunction } from 'express';

import { IEvengelismReport } from 'interfaces';
import { EvangelismReportModel } from '../../../models';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const updateEvangelismReportService = async (
  id: string,
  payload: IEvengelismReport,
  next: NextFunction,
): Promise<void | IEvengelismReport> => {
  try {
    const existingEvangelismReport = await EvangelismReportModel.findById({ _id: id });
    if (!existingEvangelismReport) {
      return next(new CustomError(400, 'General', "Evangelism Report ID doesn't exist!"));
    }

    const updatedEvangelismReport = await EvangelismReportModel.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return updatedEvangelismReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
