import { Document } from 'mongoose';

export enum EUnitType {
  CHOIR = 'choir',
  COLPORTEUR = 'colporteur',
  USHERING = "ushering",
  LIBRARY = "library",
  EVANGELISM = 'evangelism',
  MAINTENANCE = 'maintenance',
  SECRETARIAL = "secretarial",
  GPT = 'gpt/smat',
  PRAYER = 'prayer',
  SECURITY = 'security',
  ACADEMICS = 'academics',
  LOGISTIC = "logistics"
}
export interface IUnit {
  unitType: EUnitType;
  unitDescription: string;
  unitImageUrl: {
    path: string;
    fileName: string;
  };
}

export interface IUnitDocument extends IUnit, Document {}
