import { Document } from 'mongoose';

export interface IPmPrayerReport {
    hallId: string;
    numberOfBrother: number;
    numberOfSister: number;
    numberOfFirstTimer: number;
    numberOfConvert: number;
    date: Date;
    testimony: string;
    totalNumberOfAttendee: number;
}

export interface IPmPrayerReportModel extends IPmPrayerReport, Document { }