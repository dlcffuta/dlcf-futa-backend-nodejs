import { IWorker, IWorkerDocument, EUserType } from '../interfaces';
import { Schema, model } from 'mongoose';

const WorkerSchemaField: Record<keyof IWorker, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dlcfCampus: { type: String },
  unit: { type: String },
  department: { type: String },
  school: { type: String },
  level: { type: String },
  centre: { type: String },
  hall: { type: String },
  imageUrl: { type: String },
  userType: { type: String, default: EUserType.WORKER },
  phoneNumber: { type: String },
  last_login: { type: Date },
  verified: { type: Boolean },
  token: { type: String },
};

const WorkerSchema = new Schema(WorkerSchemaField, {
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

const WorkerModel = model<IWorkerDocument>('Worker', WorkerSchema);

export { WorkerModel };
