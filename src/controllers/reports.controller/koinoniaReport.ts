import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ICustomInterface } from 'interfaces';
import {
  createKoinoniaReportService,
  deleteKoinoniaReportService,
  getAllKoinoniaReportService,
  getKoinoniaReportByIdService,
  updateKoinoniaReportService,
} from '../../services/koinoniaReport.services';

@Service()
class KoinoniaReportController {
  constructor() {}

  createKoinoniaReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReport = await createKoinoniaReportService(req.body, next);
      if (newReport != null) {
        res.customSuccess(201, 'Koinonia report saved successfully');
      }
    } catch (error) {
      next(error);
    }
  };
  getKoinoniaReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await getKoinoniaReportByIdService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Koinonia report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  getAllKoinoniaReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hall, limit, page, date, totalNumberOfAttendee } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 20,
        page: page ? parseInt(page as string) : 1,
      };
      const query: ICustomInterface = {};
      if (hall) query.hall = { $regex: new RegExp(hall as string, 'i') };
      if (date) query.date = { $regex: new RegExp(date as string, 'i') };
      if (totalNumberOfAttendee)
        query.totalNumberOfAttendee = { $regex: new RegExp(totalNumberOfAttendee as string, 'i') };

      const report = await getAllKoinoniaReportService(query, option, next);
      if (report != null) {
        res.customSuccess(200, 'Koinonia report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  updateKoinoniaReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await updateKoinoniaReportService(req.params.id, req.body, next);
      if (report != null) {
        res.customSuccess(200, 'Koinonia report updated successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
  deleteKoinoniaReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await deleteKoinoniaReportService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Koinonia report deleted successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default KoinoniaReportController;
