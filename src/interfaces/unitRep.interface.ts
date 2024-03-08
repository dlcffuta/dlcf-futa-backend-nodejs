import { Document } from 'mongoose';

import { IUnit } from './index';

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
}

export interface IUnitRepresentativeDocument extends IUnitRepresentative, Document {}
