import { Schema, model } from 'mongoose';

import {
  IWorker,
  IWorkerDocument,
  EUserType,
  ESchool,
  EDlcfCampus,
  EGender,
  ELevel,
} from '../interfaces';

const WorkerSchemaField: Record<keyof IWorker, unknown> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dlcfCampus: { type: String, enum: EDlcfCampus, required: true },
  gender: { type: String, required: true, enum: EGender },
  unit: { type: String, required: true },
  department: { type: String, required: true },
  school: {
    type: String,
    enum: ESchool,
    required: true,
  },
  level: { type: String, required: true, enum: ELevel },
  centre: { type: String },
  hall: { type: String },
  residentialAddress: { type: String, required: true },
  imageUrl: { path: { type: String }, fileName: { type: String } },
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
