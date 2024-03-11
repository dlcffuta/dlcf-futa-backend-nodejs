import { NextFunction } from 'express';

import { IKoinoniaReport } from 'interfaces';
import { KoinoniaReportModel } from '../../../models';
import { CustomError } from '../../../utils/response/custom-error/customError';

export const updateKoinoniaReportService = async (
  id: string,
  payload: IKoinoniaReport,
  next: NextFunction,
): Promise<void | IKoinoniaReport> => {
  try {
    const existingKoinoniaReport = await KoinoniaReportModel.findById({ _id: id });
    if (!existingKoinoniaReport) {
      return next(new CustomError(400, 'General', "Koinonia report ID doesn't exist!"));
    }

    const updatedKoinoniaReport = await KoinoniaReportModel.findByIdAndUpdate(
      { _id: id },
      payload,
      { new: true },
    );
    return updatedKoinoniaReport;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
