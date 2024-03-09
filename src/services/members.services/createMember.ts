import { NextFunction } from 'express';

import { IMember, MemberInputDTO } from '../../interfaces';
import { CentreModel, HallModel, MemberModel } from '../../models';
import { EmailService } from '../../utils/notification';
import { CustomError } from '../../utils/response/custom-error/customError';

const emailService = new EmailService();

export const createMemberService = async (
  payload: MemberInputDTO,
  next: NextFunction,
): Promise<void | IMember> => {
  try {
    const existingMember = await MemberModel.exists({ email: payload.email });
    if (existingMember) {
      return next(new CustomError(400, 'General', 'Member already exists'));
    }
    const centre = await CentreModel.findOne({ name: payload.centre });
    if (!centre) {
      return next(new CustomError(404, 'General', 'Centre does not exist'));
    }

    const hall = await HallModel.findOne({ name: payload.hall });
    if (!hall) {
      return next(new CustomError(404, 'General', 'Hall does not exist'));
    }

    const newMember = await MemberModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      department: payload.department,
      school: payload.school,
      level: payload.level,
      centre: centre._id,
      hall: hall._id,
      gender: payload.gender,
      dlcfCampus: payload.dlcfCampus,
      residentialAddress: payload.residentialAddress,
    });

    await emailService.welcome(payload.email, payload.firstName);

    return newMember;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
