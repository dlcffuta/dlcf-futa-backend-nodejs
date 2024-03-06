import { Document } from 'mongoose';

export enum EUnitType {
  CHOIR = 'choir',
  COLPORTEUR = 'colporteur',
  EVANGELISM = 'evangelism',
  MAINTENANCE = 'maintenance',
  MEDIA = 'media',
  PRAYER = 'prayer',
  SECURITY = 'security',
  ACADEMICS = 'academics',
}
export interface IUnit {
  unitHead: string;
  unitHeadEmail: string;
  unitHeadPhone: string;
  unitHeadImage: {
    path: string;
    fileName: string;
  };
  unitType: EUnitType;
  unitDescription: string;
  unitImageUrl: {
    path: string;
    fileName: string;
  };
}

export interface IUnitDocument extends IUnit, Document {}
