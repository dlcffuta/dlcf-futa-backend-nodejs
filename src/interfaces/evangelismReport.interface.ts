import { Document } from 'mongoose';

export enum EStatus {
  Saved = 'saved',
  NotSaved = 'not Saved',
  NotSure = 'not Sure',
}
export interface IEvengelismReport {
  hallId: string;
  numberOfMembersWhoWent: number;
  date: Date;
  nameOfPeopleMinisteredTo: Array<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    status: EStatus;
  }>;
}

export interface IEvengelismReportModel extends IEvengelismReport, Document {}
