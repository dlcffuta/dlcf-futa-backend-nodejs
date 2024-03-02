import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import {
  createMemberService,
  getMemberByIdService,
  getAllMemberService,
  updateMemberService,
  deleteMemberService,
  uploadMemberProfilePictureService,
} from '../services/members.services';

import { ICustomInterface } from '../interfaces';

@Service()
class MemberControllers {
  constructor() {}

  createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newmember = await createMemberService(req.body, next);
      if (newmember != null) {
        res.customSuccess(201, 'Member created successfully', newmember);
      }
    } catch (error) {
      next(error);
    }
  };

  getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await getMemberByIdService(req.params.id, next);
      if (member != null) {
        res.customSuccess(200, 'Member fetched successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, department, level, school, hall, dlcfCampus, lastName, firstName, email } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 20,
        page: page ? parseInt(page as string) : 1,
      };

      const query: ICustomInterface = {}
      if (department) query.department = { $regex: new RegExp(department as string, "i") };
      if (level) query.level = level;
      if (school) query.school = school;
      if (hall) query.hall = hall;
      if (dlcfCampus) query.dlcfCampus = dlcfCampus; 
      if (lastName) query.lastName = { $regex: new RegExp(lastName as string, "i") };
      if (firstName) query.firstName = { $regex: new RegExp(firstName as string, "i") };
      if (email) query.email = { $regex: new RegExp(email as string, "i") };

      const members = await getAllMemberService(query, option, next);
      if (members != null) {
        res.customSuccess(200, 'Members fetched successfully', members);
      }
    } catch (error) {
      next(error);
    }
  };

  updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await updateMemberService(req.params.id, req.body, next);
      if (member != null) {
        res.customSuccess(200, 'Member updated successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const member = await deleteMemberService(req.params.id, next);
      if (member != null) {
        res.customSuccess(200, 'Member deleted successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };

  uploadProfilePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, filename } = req.file;
      const member = await uploadMemberProfilePictureService(req.params.id, { path, filename }, next);
      if (member != null) {
        res.customSuccess(200, 'Profile picture uploaded successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default MemberControllers;
