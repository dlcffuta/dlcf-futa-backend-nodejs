import { NextFunction } from 'express';

import { IHall } from '../../interfaces';
import { HallModel } from '../../models/hall';
import { CustomError } from '../../utils/response/custom-error/customError';
import { MemberModel, WorkerModel } from '../../models';

export const getHallByIdService = async (id: string, next: NextFunction): Promise<void | IHall> => {
  try {
    const hall = await HallModel.findById({ _id: id }).populate('centre').lean().exec();
    if (!hall) {
      return next(new CustomError(400, 'General', "Hall ID doesn't exist!"));
    }
    const members = await MemberModel.find({ hall: id });
    const workers = await WorkerModel.find({ hall: id });
    let maleCount = 0;
    let femaleCount = 0;
    console.log({members})
    console.log({workers})
    if (members) {
      members.forEach((member) => {
        if (member.gender === 'male') {
          maleCount++;
        } else if (member.gender === 'female') {
          femaleCount++;
        }
      });
    }
    if (workers) {
      workers.forEach((worker) => {
        if (worker.gender === 'male') {
          maleCount++;
        } else if (worker.gender === 'female') {
          femaleCount++;
        }
      });
    }
    const data = {
      ...hall,
      sisterscount: femaleCount,
      brotherscount: maleCount,
    };
    return data;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
