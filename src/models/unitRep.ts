import { model, Schema } from 'mongoose';

import { IUnitRepresentative, IUnitRepresentativeDocument } from '../interfaces';

const UnitRepresentativeSchemaField: Record<keyof IUnitRepresentative, unknown> = {
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  unitId: { type: Schema.Types.ObjectId, ref: 'Unit', required: true },
  permission: { type: Schema.Types.ObjectId, ref: 'Permission', required: true },
  unitHeadName: { type: String, required: true },
  unitHeadEmail: { type: String, required: true },
  unitHeadPhone: { type: String, required: true },
  unitHeadImage: {
    path: { type: String },
    fileName: { type: String },
  },
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false }
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
