import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ICustomInterface } from '../interfaces';
import {
  createHallRepService,
  getHallRepresentativeByIdService,
  getAllHallRepresentativeService,
    uploadHallRepProfilePictureService,
    updateHallRepresentativeService,
} from '../services/hallRep.services';
import { uploadFile } from '../utils/cloudinary';
import { CustomError } from '../utils/response/custom-error/customError';

@Service()
class HallRepresentativeControllers {
  constructor() {}

  createHallRepresentative = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createHallRepService(req.body, next);
      if (data != null) {
        res.customSuccess(201, 'HallRepresentative created successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getHallRepresentativeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getHallRepresentativeByIdService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'HallRepresentative fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllHallRepresentatives = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, workerId, hallRepEmail, hallRepPhone, hallRepName } = req.query;

      const option: ICustomInterface = {
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      };
      const query: ICustomInterface = {};
      if (workerId) query.workerId = { $regex: new RegExp(workerId as string, 'i') };
      if (hallRepEmail) query.hallRepEmail = { $regex: new RegExp(hallRepEmail as string, 'i') };
      if (hallRepPhone) query.hallRepPhone = { $regex: new RegExp(hallRepPhone as string, 'i') };
      if (hallRepName) query.hallRepName = { $regex: new RegExp(hallRepName as string, 'i') };

      const data = await getAllHallRepresentativeService(query, option, next);
      if (data != null) {
        res.customSuccess(200, 'HallRepresentatives fetched successfully', data);
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
      const data = await uploadHallRepProfilePictureService(
        req.params.id,
        imageUrl as string,
        next,
      );
      if (data != null) {
        res.customSuccess(200, 'Profile picture uploaded successfully', data);
      }
    } catch (error) {
      next(error);
    }
    };
    
    updateHallRepresentative = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await updateHallRepresentativeService(req.params.id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'HallRepresentative updated successfully', data);
      }
        } catch (error) {
            next(error)
        }
    }

  // To be implemented:
  // 1. moveHallRepresentativeToAnotherUnit
  // 2. moveHallRepresentativeToAnotherHall
  // 3. moveHallRepresentativeToAnotherCentre
  // 4. moveHallRepresentativeToAnotherDlcfCampus
  // 5. moveHallRepresentativeToMember
  // 6. moveHallRepresentativeToStudentLeader
}

export default HallRepresentativeControllers;
