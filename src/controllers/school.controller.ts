import { NextFunction, Request, Response } from 'express';
import { Service } from 'typedi';

import { ICustomInterface } from '../interfaces';
import {
  createSchoolService,
  deleteSchoolService,
  getSchoolByIdService,
  updateSchoolService,
  getAllSchoolService,
} from '../services/school.services';

@Service()
class SchoolControllers {
  constructor() {}

  createSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await createSchoolService(req.body, next);
      if (data != null) {
        res.customSuccess(201, 'School created successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getSchoolById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await getSchoolByIdService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'School fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllSchools = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page, department, school, schoolCode } = req.query;
      const option: ICustomInterface = {
        limit: limit ? parseInt(limit as string) : 10,
        page: page ? parseInt(page as string) : 1,
      };

      const query: ICustomInterface = {};

      if (department) {
        const checkIfHasSpace = (department as string).includes(' ');
        let departmentProperty: string;
        if (checkIfHasSpace) {
          departmentProperty = (department as string).toLowerCase().replace(/\s+/g, '_');
        }
        if (!checkIfHasSpace) {
          departmentProperty = (department as string).toLowerCase();
        }
        query[`department.${departmentProperty}`] = {
          $regex: new RegExp(department as string, 'i'),
        };
      }

      if (school) query.school = { $regex: new RegExp(school as string, 'i') };
      if (schoolCode) query.schoolCode = { $regex: new RegExp(schoolCode as string, 'i') };

      const data = await getAllSchoolService(query, option, next);
      if (data != null) {
        res.customSuccess(200, 'Schools fetched successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  updateSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await updateSchoolService(req.params.id, req.body, next);
      if (data != null) {
        res.customSuccess(200, 'School updated successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };

  deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await deleteSchoolService(req.params.id, next);
      if (data != null) {
        res.customSuccess(200, 'School deleted successfully', data);
      }
    } catch (error) {
      next(error);
    }
  };
}

export default SchoolControllers;
