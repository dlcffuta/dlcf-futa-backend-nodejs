import { Document } from 'mongoose';

export interface IKoinoniaReport {
  hallId: string;
  numberOfBrother: number;
  numberOfSister: number;
  numberOfFirstTimer: number;
  numberOfConvert: number;
  numberOfKoinoniaPoint: number;
  date: Date;
  testimony: string;
  totalNumberOfAttendee: number;
}

export interface IKoinoniaReportModel extends IKoinoniaReport, Document {}
