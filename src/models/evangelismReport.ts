import { model, Schema } from 'mongoose';
import { EStatus, IEvangelismReport, IEvangelismReportModel } from 'interfaces';

const EvangelismSchemaField: Record<keyof IEvangelismReport, any> = {
  hallId: { type: String, require: true, ref: 'Hall' },
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

const EvangelismReportModel = model<IEvangelismReportModel>(
  'EvangelismReport',
  EvangelismReportSchema,
);

export { EvangelismReportModel };
