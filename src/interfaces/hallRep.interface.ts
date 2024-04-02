import { Document } from 'mongoose';

import { IHall, IPermission } from './index';

export interface IHallRepresentative {
  workerId: string;
  hallId: string | IHall;
  hallRepName: string;
  hallRepEmail: string;
  hallRepPhone: string;
  hallRepImage: {
    path: string;
    fileName: string;
  };
  permission: string | IPermission;
  deletedAt: Date;
  deleted: boolean;
}

export interface IHallRepresentativeDocument extends IHallRepresentative, Document {}
