import { Document } from 'mongoose';

export interface IAmPrayerReport {
  hallId: string;
  numberOfBrother: number;
  numberOfSister: number;
  numberOfFirstTimer: number;
  numberOfConvert: number;
  date: Date;
  testimony: string;
  totalNumberOfAttendee: number;
}

export interface IAmPrayerReportModel extends IAmPrayerReport, Document { }