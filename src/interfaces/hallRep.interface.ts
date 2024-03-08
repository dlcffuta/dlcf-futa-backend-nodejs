import { Document } from 'mongoose';

import { IHall } from './index';

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
}

export interface IHallRepresentativeDocument extends IHallRepresentative, Document {}
