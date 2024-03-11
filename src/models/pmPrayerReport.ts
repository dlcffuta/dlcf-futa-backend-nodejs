import { Schema, model } from 'mongoose';
import { IPmPrayerReport, IPmPrayerReportModel } from '../interfaces';

const PmPrayerReportSchemaField: Record<keyof IPmPrayerReport, any> = {
  hallId: { type: String, ref: 'Hall', require: true },
  numberOfBrother: { type: Number, require: true },
  numberOfSister: { type: Number, require: true },
  numberOfFirstTimer: { type: Number, require: true },
  numberOfConvert: { type: Number, require: true },
  date: { type: Date, require: true },
  testimony: { type: String, require: true },
  totalNumberOfAttendee: { type: Number, require: true },
};

const PmPrayerReportSchema = new Schema(PmPrayerReportSchemaField, {
  timestPmps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});
const PmPrayerReportModel = model<IPmPrayerReportModel>(
  'EveningPrayerReport',
  PmPrayerReportSchema,
);

export { PmPrayerReportModel };
