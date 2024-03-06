import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import {
  loginAdminService,
  changePasswordService,
  forgotPasswordService
} from '../services/admin.services';

@Service()
class AdminControllers {
  constructor() {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await loginAdminService(req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Admin logged in successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await changePasswordService(req.jwtPayload.user_id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Password changed successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await forgotPasswordService(req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Password resolved successfully', data);
      }
    } catch (error) {
      next(error);
    }
  }

}

export default AdminControllers;
