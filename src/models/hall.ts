import { IHall, IHallDocument } from 'interfaces';
import { Schema, model } from 'mongoose';

const IHallSchemaField: Record<keyof IHall, any> = {
  name: { type: String, required: true },
  location: { type: String, required: true },
  centre: { type: Schema.Types.ObjectId, required: true, ref: 'Centre' },
};

const HallSchema = new Schema(IHallSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const HallModel = model<IHallDocument>('Hall', HallSchema);

export { HallModel };
