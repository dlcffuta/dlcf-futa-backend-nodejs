import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';
import { ICustomInterface } from 'interfaces';
import {
  createAmPrayerReportService,
  deleteAmPrayerReportService,
  getAllAmPrayerReportService,
  getAmPrayerReportByIdService,
  updateAmPrayerReportService,
} from 'services/reports.services';

@Service()
class AmPrayerReportController {
  constructor() {}

  createAmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newReport = await createAmPrayerReportService(req.body, next);
      if (newReport != null) {
        res.customSuccess(201, 'Morning prayer report saved successfully');
      }
    } catch (error) {
      next(error);
    }
  };
  getAmPrayerReportById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await getAmPrayerReportByIdService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Morning prayer report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  getAllAmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
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

      const report = await getAllAmPrayerReportService(query, option, next);
      if (report != null) {
        res.customSuccess(200, 'Morning prayer report found', report);
      }
    } catch (error) {
      next(error);
    }
  };
  updateAmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await updateAmPrayerReportService(req.params.id, req.body, next);
      if (report != null) {
        res.customSuccess(200, 'Morning prayer report updated successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
  deleteAmPrayerReport = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const report = await deleteAmPrayerReportService(req.params.id, next);
      if (report != null) {
        res.customSuccess(200, 'Morning prayer report deleted successfully', report);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default AmPrayerReportController;
