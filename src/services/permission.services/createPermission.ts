import { NextFunction } from 'express';

import { IPermission } from '../../interfaces';
import { PermissionModel, AdminModel, HallRepresentativeModel, UnitRepresentativeModel, CentreRepresentativeModel} from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const createPermissionService = async (
  id: string,
  next: NextFunction,
): Promise<void | IPermission | string> => {
  try {
    const admin = await AdminModel.findById({ _id: id });
    if (admin) {
      const permission = await PermissionModel.create({
        admin: admin,
        centre: { create: true, view: true, edit: true, delete: true },
        member: { create: true, view: true, edit: true, delete: true },
        worker: { create: true, view: true, edit: true, delete: true },
        unit: { create: true, view: true, edit: true, delete: true },
        hall: { create: true, view: true, edit: true, delete: true },
        school: { create: true, view: true, edit: true, delete: true },
        dlcfCampus: { create: true, view: true, edit: true, delete: true },
        pastor: { create: true, view: true, edit: true, delete: true },
        studentLeader: { create: true, view: true, edit: true, delete: true },
      });
      admin.permission = permission._id;
      await admin.save();
      return permission;
    }

    const hallRep = await HallRepresentativeModel.findById({ _id: id });
    if (hallRep) {
      const permission = await PermissionModel.create({
        hallRep: hallRep,
        hall: { create: true, view: true, edit: true, delete: true },
      });
      hallRep.permission = permission._id;
      await hallRep.save();
      return permission;
    };

    const unitRep = await UnitRepresentativeModel.findById({ _id: id });
    if (unitRep) {
      const permission = await PermissionModel.create({
        unitRep: unitRep,
        unit: { create: true, view: true, edit: true, delete: true },
      });
      unitRep.permission = permission._id;
      await unitRep.save();
      return permission;
    };

    const centreRep = await CentreRepresentativeModel.findById({ _id: id });
    if (centreRep) {
      const permission = await PermissionModel.create({
        centreRep: centreRep,
        centre: { create: true, view: true, edit: true, delete: true },
      });
      centreRep.permission = permission._id;
      await centreRep.save();
      return permission;
    };

    return 'Invalid ID provided';
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
