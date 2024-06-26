import { NextFunction } from 'express';
import { ICustomInterface } from 'interfaces';
import { HallModel, CentreModel, MemberModel, WorkerModel } from '../../models';
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

    const halls = await HallModel.find(query)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate('centre')
      .lean()
      .exec();

    const total = await HallModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const memberCounts = await MemberModel.aggregate([
      { $match: { hall: { $in: halls.map((hall) => hall._id) } } },
      {
        $group: {
          _id: '$hall',
          brothersCount: { $sum: { $cond: [{ $eq: ['$gender', 'male'] }, 1, 0] } },
          sistersCount: { $sum: { $cond: [{ $eq: ['$gender', 'female'] }, 1, 0] } },
        },
      },
    ]);

    const workerCounts = await WorkerModel.aggregate([
      { $match: { hall: { $in: halls.map((hall) => hall._id) } } },
      {
        $group: {
          _id: '$hall',
          brothersCount: { $sum: { $cond: [{ $eq: ['$gender', 'male'] }, 1, 0] } },
          sistersCount: { $sum: { $cond: [{ $eq: ['$gender', 'female'] }, 1, 0] } },
        },
      },
    ]);

    const counts = {};
    memberCounts.forEach((count) => {
      counts[count._id] = { brothersCount: count.brothersCount, sistersCount: count.sistersCount };
    });

    workerCounts.forEach((count) => {
      if (counts[count._id]) {
        counts[count._id].brothersCount += count.brothersCount;
        counts[count._id].sistersCount += count.sistersCount;
      } else {
        counts[count._id] = {
          brothersCount: count.brothersCount,
          sistersCount: count.sistersCount,
        };
      }
    });

    const resultHalls = halls.map((hall) => ({
      ...hall,
      brothersCount: counts[hall._id]?.brothersCount || 0,
      sistersCount: counts[hall._id]?.sistersCount || 0,
    }));

    const result = {
      limit,
      halls: resultHalls,
      totalPages,
      currentPage: page,
    };

    return result;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
