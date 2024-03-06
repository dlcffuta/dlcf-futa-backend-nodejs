import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ICustomInterface } from '../interfaces';
import {
  createWorkerService,
  getWorkerByIdService,
  getAllWorkerService,
  updateWorkerService,
  deleteWorkerService,
  uploadWorkerProfilePictureService,
} from '../services/workers.services';
import { uploadFile } from '../utils/cloudinary';
import { CustomError } from '../utils/response/custom-error/customError';

@Service()
class WorkerControllers {
  constructor() {}

  createWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createWorkerService(req.body, next);
      if (data != null) {
        res.customSuccess(201, 'Worker created successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getWorkerById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getWorkerByIdService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Worker fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllWorkers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        limit,
        page,
        department,
        level,
        school,
        hall,
        dlcfCampus,
        lastName,
        firstName,
        email,
        unit,
      } = req.query;

      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 20,
        page: page ? parseInt(page as string) : 1,
      };
      const query: ICustomInterface = {};
      if (department) query.department = { $regex: new RegExp(department as string, 'i') };
      if (level) query.level = level;
      if (school) query.school = school;
      if (hall) query.hall = hall;
      if (dlcfCampus) query.dlcfCampus = dlcfCampus;
      if (lastName) query.lastName = { $regex: new RegExp(lastName as string, 'i') };
      if (firstName) query.firstName = { $regex: new RegExp(firstName as string, 'i') };
      if (email) query.email = { $regex: new RegExp(email as string, 'i') };
      if (unit) query.unit = { $regex: new RegExp(unit as string, 'i') };

      const data = await getAllWorkerService(query, option, next);
      if (data != null) {
        res.customSuccess(200, 'Workers fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  updateWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await updateWorkerService(req.params.id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Worker updated successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteWorker = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteWorkerService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Worker deleted successfully', data);
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
      const data = await uploadWorkerProfilePictureService(req.params.id, imageUrl as string, next);
      if (data != null) {
        res.customSuccess(200, 'Profile picture uploaded successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  // To be implemented:
  // 1. moveWorkerToAnotherUnit
  // 2. moveWorkerToAnotherHall
  // 3. moveWorkerToAnotherCentre
  // 4. moveWorkerToAnotherDlcfCampus
  // 5. moveWorkerToMember
  // 6. moveWorkerToStudentLeader
}

export default WorkerControllers;
