import { model, Schema } from 'mongoose';

import { IUnitRepresentative, IUnitRepresentativeDocument } from '../interfaces';

const UnitRepresentativeSchemaField: Record<keyof IUnitRepresentative, unknown> = {
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  unitId: { typ: Schema.Types.ObjectId, ref: 'Unit', required: true },
  unitHeadName: { type: String, required: true },
  unitHeadEmail: { type: String, required: true },
  unitHeadPhone: { type: String, required: true },
  unitHeadImage: {
    path: { type: String },
    fileName: { type: String },
  },
};

const UnitRepresentativeSchema = new Schema(UnitRepresentativeSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const UnitRepresentativeModel = model<IUnitRepresentativeDocument>(
  'UnitRepresentative',
  UnitRepresentativeSchema,
);

export { UnitRepresentativeModel };
