import { IHallRepresentative, IHallRepresentativeDocument } from '../interfaces';
import { Schema, model } from 'mongoose';

const IHallRepresentativeSchemaField: Record<keyof IHallRepresentative, any> = {
  workerId: { type: Schema.Types.ObjectId, required: true, ref: 'Worker' },
  hallId: { type: Schema.Types.ObjectId, required: true, ref: 'Hall' },
  permission: { type: Schema.Types.ObjectId, required: true, ref: 'Permission' },
  hallRepName: { type: String, required: true },
  hallRepEmail: { type: String, required: true },
  hallRepPhone: { type: String, required: true },
  hallRepImage: {
    path: { type: String },
    fileName: { type: String },
  },
  deletedAt: { type: Date, default: null },
  deleted: { type: Boolean, default: false }
};

const HallRepresentativeSchema = new Schema(IHallRepresentativeSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const HallRepresentativeModel = model<IHallRepresentativeDocument>(
  'HallRepresentative',
  HallRepresentativeSchema,
);

export { HallRepresentativeModel };
