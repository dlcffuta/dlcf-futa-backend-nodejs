import { model, Schema } from 'mongoose';
import { EStatus, IEvengelismReport, IEvengelismReportModel } from '../interfaces';

const EvangelismSchemaField: Record<keyof IEvengelismReport, unknown> = {
  hallId: { type: Schema.Types.ObjectId, ref: 'Hall', require: true },
  numberOfMembersWhoWent: { type: Number, require: true },
  date: { type: Date, require: true },
  nameOfPeopleMinisteredTo: {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    status: { type: String, enum: EStatus, require: true },
  },
};

const EvangelismReportSchema = new Schema(EvangelismSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const EvangelismReportModel = model<IEvengelismReportModel>(
  'EvangelismReport',
  EvangelismReportSchema,
);

export { EvangelismReportModel };
