import { Schema, model } from 'mongoose';
import { IKoinoniaReport, IKoinoniaReportModel } from '../interfaces';
import { number } from 'joi';

const KoinoniaReportSchemaField: Record<keyof IKoinoniaReport, any> = {
  hallId: { type: String, ref: 'Hall', require: true },
  numberOfBrother: { type: Number, require: true },
  numberOfSister: { type: Number, require: true },
  numberOfFirstTimer: { type: Number, require: true },
  numberOfConvert: { type: Number, require: true },
  numberOfKoinoniaPoint: { type: number, require: true },
  date: { type: Date, require: true },
  testimony: { type: String, require: true },
  totalNumberOfAttendee: { type: Number, require: true },
};

const KoinoniaReportSchema = new Schema(KoinoniaReportSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});
const KoinoniaReportModel = model<IKoinoniaReportModel>('KoinoniaReport', KoinoniaReportSchema);

export { KoinoniaReportModel };
