import { NextFunction } from 'express';
import { IEvangelismReport, ICustomInterface } from 'interfaces';
import { EvangelismReportModel, HallModel } from 'models';
import { CustomError } from 'utils/response/custom-error/customError';

export const getAllEvangelismReportService = async (
  query: ICustomInterface,
  option: ICustomInterface,
  next: NextFunction,
): Promise<void | object> => {
  try {
    const { page, limit } = option as { page: number; limit: number };
    const { hall } = query as { hall: string };
    if (hall) {
      const hallId = await HallModel.exists({ name: hall });
      if (!hallId) {
        return next(new CustomError(400, 'General', 'Hall does not exist'));
      }
      query = { ...query, hallId: hallId._id };
    }
    const EvangelismReport = await EvangelismReportModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('Hall')
      .exec();
    const total = await EvangelismReportModel.countDocuments(query);
    const totalPages = Math.floor(total / limit);
    const result = {
      limit,
      EvangelismReport,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
