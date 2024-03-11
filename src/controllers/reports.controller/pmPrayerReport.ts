import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ICustomInterface } from 'interfaces';
import {
  createPmPrayerReportService,
  deletePmPrayerReportService,
  getAllPmPrayerReportService,
  getPmPrayerReportByIdService,
  updatePmPrayerReportService,
} from '../../services/reports.services';

@Service()
class PmPrayerReportController {
  constructor() {}

  createPmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReport = await createPmPrayerReportService(req.body, next);
      if (newReport != null) {
        res.customSuccess(201, 'Evening prayer report saved successfully');
      }
    } catch (error) {
      next(error);
    }
  };
  getPmPrayerReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await getPmPrayerReportByIdService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Evening prayer report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  getAllPmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
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

      const report = await getAllPmPrayerReportService(query, option, next);
      if (report != null) {
        res.customSuccess(200, 'Evening prayer report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  updatePmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await updatePmPrayerReportService(req.params.id, req.body, next);
      if (report != null) {
        res.customSuccess(200, 'Evening prayer report updated successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
  deletePmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await deletePmPrayerReportService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Evening prayer report deleted successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
}
export default PmPrayerReportController;
