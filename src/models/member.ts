import { IUser, IUserDocument } from "interfaces/user.interface";
import { Schema, model } from "mongoose";

const UserSchemaField: Record<keyof IUser, any> = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  department: { type: String },
  school: { type: String },
  level: { type: String },
  centre: { type: String },
  hall: { type: String },
  imageUrl: { type: String },
  last_login: { type: Date },
  verified: { type: Boolean },
  token: { type: String },
};

const UserSchema = new Schema(UserSchemaField, {
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

const UserModel = model<IUserDocument>("user", UserSchema);

export { UserModel };
