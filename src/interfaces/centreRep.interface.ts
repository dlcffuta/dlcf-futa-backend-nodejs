import { Document } from 'mongoose';

import { ICentre } from './index';

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
}

export interface ICentreRepresentativeDocument extends ICentreRepresentative, Document {}
