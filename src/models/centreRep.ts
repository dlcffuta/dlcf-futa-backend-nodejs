import { Schema, model } from 'mongoose';

import { ICentreRepresentative, ICentreRepresentativeDocument } from '../interfaces';

const ICentreRepresentativechemaField: Record<keyof ICentreRepresentative, unknown> = {
  workerId: { type: Schema.Types.ObjectId, ref: 'Worker', required: true },
  centreId: { type: Schema.Types.ObjectId, ref: 'Centre', required: true },
  centerRepName: { type: String, required: true },
  centerRepEmail: { type: String, required: true },
  centerRepPhone: { type: String, required: true },
  centerRepImage: {
    path: { type: String },
    fileName: { type: String },
  },
};

const CentreRepresentativeSchema = new Schema(ICentreRepresentativechemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;
    },
  },
});

const CentreRepresentativeModel = model<ICentreRepresentativeDocument>(
  'CentreRepresentative',
  CentreRepresentativeSchema,
);

export { CentreRepresentativeModel };
