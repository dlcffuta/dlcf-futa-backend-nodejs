import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ICustomInterface } from '../interfaces';
import {
  createCentreService,
  deleteCentreService,
  getCentreByIdService,
  updateCentreService,
  getAllCentreService,
} from '../services/centre.services';

@Service()
class CentreControllers {
  constructor() {}

  createCentre = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createCentreService(req.body, next);
      if (data != null) {
        res.customSuccess(201, 'Centre created successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getCentreById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getCentreByIdService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Centre fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllCentres = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, name, location, hall, dlcfCampus } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 1,
      };

      const query: ICustomInterface = {};
      if (name) query.name = { $regex: new RegExp(name as string, 'i') };
      if (location) query.location = { $regex: new RegExp(location as string, 'i') };
      if (hall) query.hall = { $regex: new RegExp(hall as string, 'i') };
      if (dlcfCampus) query.dlcfCampus = { $regex: new RegExp(dlcfCampus as string, 'i') };

      const data = await getAllCentreService(query, option, next);
      if (data != null) {
        res.customSuccess(200, 'Centres fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  updateCentre = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await updateCentreService(req.params.id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'Centre updated successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteCentre = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteCentreService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'Centre deleted successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default CentreControllers;
