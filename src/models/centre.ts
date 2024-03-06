import { Schema, model } from 'mongoose';

import { ICentre, ICentreDocument } from '../interfaces';

const ICenterchemaField: Record<keyof ICentre, any> = {
  name: { type: String },
  location: { type: String },
};

const CentreSchema = new Schema(ICenterchemaField, {
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

const CentreModel = model<ICentreDocument>('Centre', CentreSchema);

export { CentreModel };
