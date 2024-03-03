import { NextFunction } from 'express';

import { IMember, MemberInputDTO } from '../../interfaces';
import { MemberModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';
import { EmailService } from '../../utils/notification';

const emailService = new EmailService();

export const createMemberService = async (payload: MemberInputDTO, next: NextFunction): Promise<void | IMember> => {
  try {
    const existingMember = await MemberModel.exists({ email: payload.email });
    if (existingMember) {
      return next(new CustomError(400, 'General', 'Member already exists'));
      }
      
    const newMember = await MemberModel.create({
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      department: payload.department,
      school: payload.school,
      level: payload.level,
      centre: payload.centre,
        hall: payload.hall,
      dlcfCampus: payload.dlcfCampus,
    });

    await emailService.welcome(payload.email, payload.firstName);
    
    return newMember;
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
