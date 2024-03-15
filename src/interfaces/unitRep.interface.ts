import { Document } from 'mongoose';

import { IUnit, IPermission } from './index';

export interface IUnitRepresentative {
  workerId: string;
  unitId: string | IUnit;
  unitHeadName: string;
  unitHeadEmail: string;
  unitHeadPhone: string;
  unitHeadImage: {
    path: string;
    fileName: string;
  };
  permission: string | IPermission;
  deletedAt: Date
  deleted: boolean
}

export interface IUnitRepresentativeDocument extends IUnitRepresentative, Document {}
