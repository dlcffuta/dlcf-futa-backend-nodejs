import { Schema, model } from 'mongoose';

import { IAdmin, IAdminDocument } from '../interfaces';

const AdminSchemaField: Record<keyof IAdmin, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  imageUrl: { type: String },
  permission: { type: Schema.Types.ObjectId, ref: 'Permission' },
  userType: { type: String, required: true },
  phoneNumber: { type: String },
  last_login: { type: Date },
  verified: { type: Boolean },
  token: { type: String },
};

const AdminSchema = new Schema(AdminSchemaField, {
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

const AdminModel = model<IAdminDocument>('Admin', AdminSchema);

export { AdminModel };
