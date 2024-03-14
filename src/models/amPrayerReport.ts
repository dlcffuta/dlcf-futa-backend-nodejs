import { Schema, model } from 'mongoose';
import { IAmPrayerReport, IAmPrayerReportModel } from '../interfaces';

const AmPrayerReportSchemaField: Record<keyof IAmPrayerReport, any> = {
  hallId: { type: Schema.Types.ObjectId, ref: 'Hall', require: true },
  numberOfBrother: { type: Number, require: true },
  numberOfSister: { type: Number, require: true },
  numberOfFirstTimer: { type: Number, require: true },
  numberOfConvert: { type: Number, require: true },
  date: { type: Date, require: true },
  testimony: { type: String, require: true },
  totalNumberOfAttendee: { type: Number, require: true },
};

const AmPrayerReportSchema = new Schema(AmPrayerReportSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});
const AmPrayerReportModel = model<IAmPrayerReportModel>(
  'MorningPrayerReport',
  AmPrayerReportSchema,
);

export { AmPrayerReportModel };
