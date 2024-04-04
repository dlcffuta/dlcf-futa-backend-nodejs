import { NextFunction } from 'express';
import { ICustomInterface } from 'interfaces';
import { PmPrayerReportModel, HallModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllPmPrayerReportService = async (
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
      delete query.hall;
    }
    const PmPrayerReport = await PmPrayerReportModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('hallId')
      .exec();
    const total = await PmPrayerReportModel.countDocuments(query);
    const totalPages = Math.floor(total / limit);
    const result = {
      limit,
      PmPrayerReport,
      totalPages,
      currentPage: page,
    };
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
