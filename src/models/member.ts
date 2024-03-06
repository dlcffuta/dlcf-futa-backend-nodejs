import { Schema, model } from 'mongoose';

import { IMember, IMemberDocument, EUserType, EDlcfCampus, ESchool, ECentre } from '../interfaces';

const MemberSchemaField: Record<keyof IMember, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  dlcfCampus: { type: String, enum: EDlcfCampus },
  department: { type: String },
  school: {
    type: String,
    enum: ESchool,
  },
  level: { type: String },
  centre: { type: String, enum: ECentre },
  hall: { type: String },
  imageUrl: { path: { type: String }, fileName: { type: String } },
  userType: { type: String, default: EUserType.MEMBER },
  phoneNumber: { type: String },
  last_login: { type: Date },
  verified: { type: Boolean },
  token: { type: String },
};

const MemberSchema = new Schema(MemberSchemaField, {
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

const MemberModel = model<IMemberDocument>('Members', MemberSchema);

export { MemberModel };
