import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import {
  createHallService,
  getHallByIdService,
  getAllHallService,
  updateHallService,
  deleteHallService,
} from '../services/hall.services';

import { ICustomInterface } from 'interfaces';

@Service()
class HallControllers {
  constructor() {}
  createHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newHall = await createHallService(req.body, next);
      if (newHall != null) {
        res.customSuccess(201, 'Hall created successfully', newHall);
      }
    } catch (error) {
      next(error);
    }
  };
  getHallById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hall = await getHallByIdService(req.params.id, next);
      if (hall != null) {
        res.customSuccess(200, `hall found`, hall);
      }
    } catch (error) {
      next(error);
    }
  };
  getAllHalls = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hall, location, limit, page, name } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 20,
        page: page ? parseInt(page as string) : 1,
      };
      const query: ICustomInterface = {};
      if (hall) query.hall = { $regex: new RegExp(hall as string, 'i') };
      if (location) query.location = { $regex: new RegExp(location as string, 'i') };
      if (name) query.name = { $regex: new RegExp(name as string, 'i') };
      const halls = await getAllHallService(query, option, next);
      if (halls != null) {
        res.customSuccess(200, 'halls found', halls);
      }
    } catch (error) {
      next(error);
    }
  };
  updateHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hall = await updateHallService(req.params.id, req.body, next);
      if (hall != null) {
        res.customSuccess(200, 'hall updated successfully', hall);
      }
    } catch (error) {
      next(error);
    }
  };
  deleteHall = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const hall = await deleteHallService(req.params.id, next);
      if (hall != null) {
        res.customSuccess(200, 'hall deleted successfully', hall);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default HallControllers;
