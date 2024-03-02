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

import { CustomError } from '../utils/response/custom-error/customError';
import { uploadFile } from '../utils/cloudinary';

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
      const query = req.query;
      const option = req.query;
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
      const file = req.file;
      if (!file) {
        return next(new CustomError(400, 'General', 'Please upload a file'));
      }
      const imageUrl = await uploadFile(file, 'profile-pictures');
      const member = await uploadMemberProfilePictureService(req.params.id, imageUrl as string, next);
      if (member != null) { 
        res.customSuccess(200, 'Profile picture uploaded successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default MemberControllers;
