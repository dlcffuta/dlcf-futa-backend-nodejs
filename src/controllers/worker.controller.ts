import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import {
  createWorkerService,
  getWorkerByIdService,
  getAllWorkerService,
  updateWorkerService,
  deleteWorkerService,
  uploadWorkerProfilePictureService,
} from '../services/workers.services';

import { CustomError } from '../utils/response/custom-error/customError';
import { uploadFile } from '../utils/cloudinary';

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
      const query = req.query;
      const option = req.query;
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
}

export default WorkerControllers;