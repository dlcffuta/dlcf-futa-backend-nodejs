import { Document } from 'mongoose';

export enum EStatus {
  Saved = 'Saved',
  NotSaved = 'Not Saved',
  NotSure = 'Not Sure',
}
export interface IEvengelismReport {
  hallId: string;
  numberOfMembersWhoWent: number;
  date: Date;
  nameOfPeopleMinisteredTo: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    status: EStatus;
  };
}

export interface IEvengelismReportModel extends IEvengelismReport, Document {}
