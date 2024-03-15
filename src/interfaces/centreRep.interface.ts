import { Document } from 'mongoose';

import { ICentre, IPermission } from './index';

export interface ICentreRepresentative {
  workerId: string;
  centreId: string | ICentre;
  centerRepName: string;
  centerRepEmail: string;
  centerRepPhone: string;
  centerRepImage: {
    path: string;
    fileName: string;
  };
  permission: string | IPermission;
  deletedAt: Date
  deleted: boolean
}

export interface ICentreRepresentativeDocument extends ICentreRepresentative, Document {}
