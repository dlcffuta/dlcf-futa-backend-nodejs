import { Document } from 'mongoose';

import { IAdmin } from './admin.interface';

export interface IPermissionCheck {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface IPermission {
  admin: string | IAdmin;
  unitRep: string;
  centreRep: string;
  hallRep: string;
  centre: IPermissionCheck;
  member: IPermissionCheck;
  worker: IPermissionCheck;
  unit: IPermissionCheck;
  hall: IPermissionCheck;
  school: IPermissionCheck;
  dlcfCampus: IPermissionCheck;
  pastor: IPermissionCheck;
  studentLeader: IPermissionCheck;
}

export interface IPermissionDocument extends IPermission, Document {}
