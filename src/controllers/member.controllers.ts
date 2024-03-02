import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { createMemberService } from '../services/members.services';

@Service()
class MemberControllers {
  constructor() {}

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
}

export default MemberControllers;
