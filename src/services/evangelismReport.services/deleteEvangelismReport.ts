import { NextFunction } from 'express';
import { EvangelismReportModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteEvangelismReportService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingEvangelismReport = await EvangelismReportModel.findById({ _id: id });
    if (!existingEvangelismReport) {
      return next(new CustomError(400, 'General', 'Evangelism report does not exist'));
    }
    await EvangelismReportModel.findOneAndDelete({ _id: id });
    return `Report for evangelism (${existingEvangelismReport.date}) deleted successfully`;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
