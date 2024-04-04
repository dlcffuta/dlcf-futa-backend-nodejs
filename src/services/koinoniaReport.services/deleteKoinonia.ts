import { NextFunction } from 'express';
import { KoinoniaReportModel } from '../../models';

import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteKoinoniaReportService = async (
  id: string,
  next: NextFunction,
): Promise<void | string> => {
  try {
    const existingKoinoniaReport = await KoinoniaReportModel.findById({ _id: id });
    if (!existingKoinoniaReport) {
      return next(new CustomError(400, 'General', 'Koinonia report does not exist'));
    }
    await KoinoniaReportModel.findOneAndDelete({ _id: id });
    return `Koinonia report (${existingKoinoniaReport.date}) deleted successfully`;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
