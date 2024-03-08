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
import CloudinaryUtil from '../utils/cloudinary';

@Service()
class MemberControllers {
  constructor() {
   
  }

  createMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newUser = await createMemberService(req.body, next);
      if (newUser != null) {
        res.customSuccess(201, 'User created successfully', newUser);
      }
    } catch (error) {
      next(error);
    }
  };

  getMemberById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await getMemberByIdService(req.params.id, next);
      if (user != null) {
        res.customSuccess(200, 'User found', user);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query;
      const option = req.query;
      const users = await getAllMemberService(query, option, next);
      if (users != null) {
        res.customSuccess(200, 'Users found', users);
      }
    } catch (error) {
      next(error);
    }
  };

  updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await updateMemberService(req.params.id, req.body, next);
      if (user != null) {
        res.customSuccess(200, 'User updated successfully', user);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await deleteMemberService(req.params.id, next);
      if (user != null) {
        res.customSuccess(200, 'User deleted successfully', user);
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
  // let imageUrl: string | null = await new CloudinaryUtil().uploadBuffer(file, "profile-pictures");
      const user = await uploadMemberProfilePictureService(req.params.id, "file", next);
      if (user != null) {
        res.customSuccess(200, 'Profile picture uploaded successfully', user);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default MemberControllers;
