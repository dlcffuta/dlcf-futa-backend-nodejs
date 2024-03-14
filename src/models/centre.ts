import { Schema, model } from 'mongoose';

import { EDlcfCampus, ICentre, ICentreDocument, IHallDocument } from '../interfaces';

const ICenterchemaField: Record<keyof ICentre, unknown> = {
  name: { type: String },
  halls: [{ type: Schema.Types.ObjectId, ref: 'Hall' }],
  location: { type: String },
  dlcfCampus: { type: String, enum: EDlcfCampus },
};

const CentreSchema = new Schema(ICenterchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.password;

      if (doc.halls && Array.isArray(doc.halls)) {
        ret.halls = doc.halls.map((hall: IHallDocument) => {
          return { id: hall._id, name: hall.name, location: hall.location };
        });
      }
    },
  },
});

const CentreModel = model<ICentreDocument>('Centre', CentreSchema);

export { CentreModel };
