import { NextFunction } from 'express';
import { ICustomInterface } from 'interfaces';
import { HallModel, CentreModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const getAllHallService = async (
  query: ICustomInterface,
  option: ICustomInterface,
  next: NextFunction,
): Promise<void | object> => {
  try {
    const { page, limit } = option as { page: number; limit: number };

    const { centre } = query as { centre: string };
    if (centre) {
      const centreId = await CentreModel.findOne({ name: centre });
      if (!centreId) {
        return next(new CustomError(404, 'General', 'Centre does not exist'));
      }
      query = { ...query, centre: centreId._id };
    }

    const hall = await HallModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('centre')
      .exec();
    const total = await HallModel.countDocuments(query);
    const totalPages = Math.floor(total / limit);
    const result = {
      limit,
      hall,
      totalPages,
      currentPage: page,
    };
    console.log(hall);
    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
