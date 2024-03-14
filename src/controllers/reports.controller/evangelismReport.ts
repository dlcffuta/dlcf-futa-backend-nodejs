import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ICustomInterface } from 'interfaces';
import {
  createEvangelismReportService,
  deleteEvangelismReportService,
  getAllEvangelismReportService,
  getEvangelismReportByIdService,
  updateEvangelismReportService,
} from '../../services/reports.services';

@Service()
class EvangelismReportController {
  constructor() {}

  createEvangelismReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReport = await createEvangelismReportService(req.body, next);
      if (newReport != null) {
        res.customSuccess(201, 'Evangelism report saved successfully');
      }
    } catch (error) {
      next(error);
    }
  };
  getEvangelismReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await getEvangelismReportByIdService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Evangelism report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  getAllEvangelismReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hall, limit, page, date, numberOfMembersWhoWent } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 20,
        page: page ? parseInt(page as string) : 1,
      };
      const query: ICustomInterface = {};
      if (hall) query.hall = { $regex: new RegExp(hall as string, 'i') };
      if (date) query.date = { $regex: new RegExp(date as string, 'i') };
      if (numberOfMembersWhoWent)
        query.numberOfMembersWhoWent = {
          $regex: new RegExp(numberOfMembersWhoWent as string, 'i'),
        };

      const report = await getAllEvangelismReportService(query, option, next);
      if (report != null) {
        res.customSuccess(200, 'Evangelism report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  updateEvangelismReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await updateEvangelismReportService(req.params.id, req.body, next);
      if (report != null) {
        res.customSuccess(200, 'Evangelism report updated successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
  deleteEvangelismReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await deleteEvangelismReportService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Evangelism report deleted successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default EvangelismReportController;
