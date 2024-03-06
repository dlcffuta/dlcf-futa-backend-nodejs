import { NextFunction } from 'express';

import { IPermission } from '../../interfaces';
import { PermissionModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const createPermissionService = async (admin: string, next: NextFunction): Promise<void | IPermission> => {
    try {
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
        return permission;
    } catch (error) {
        return next(new CustomError(500, 'Raw', 'Internal server', error.message));
    }
}