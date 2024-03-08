import { model, Schema } from 'mongoose';

import { EUnitType, IUnit, IUnitDocument } from '../interfaces';

const UnitSchemaField: Record<keyof IUnit, unknown> = {
  unitType: { type: String, enums: EUnitType, required: true },
  unitDescription: { type: String, required: true },
  unitImageUrl: {
    path: { type: String },
    fileName: { type: String },
  },
};

const UnitSchema = new Schema(UnitSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const UnitModel = model<IUnitDocument>('Unit', UnitSchema);

export { UnitModel };
