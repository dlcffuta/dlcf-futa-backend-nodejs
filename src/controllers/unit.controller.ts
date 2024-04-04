import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ICustomInterface } from '../interfaces';
import {
  createUnitService,
  deleteUnitService,
  getUnitByIdService,
  updateUnitService,
  getAllUnitService,
  uploadUnitImagePictureService,
} from '../services/unit.services';

@Service()
class UnitControllers {
  constructor() {}

  createUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createUnitService(req.body, next);
      if (data != null) {
        res.customSuccess(201, 'Unit created successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getUnitById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getUnitByIdService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Unit fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllUnits = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, unitType } = req.query;
      const option: ICustomInterface = {
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      };

      const query: ICustomInterface = {};

      if (unitType) query.unitType = { $regex: new RegExp(unitType as string, 'i') };

      const data = await getAllUnitService(query, option, next);
      if (data != null) {
        res.customSuccess(200, 'Units fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  updateUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await updateUnitService(req.params.id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Unit updated successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteUnit = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteUnitService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Unit deleted successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  uploadUnitImagePicture = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { path, filename } = req.file;
      const member = await uploadUnitImagePictureService(req.params.id, { path, filename }, next);
      if (member != null) {
        res.customSuccess(200, 'Profile picture uploaded successfully', member);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default UnitControllers;
