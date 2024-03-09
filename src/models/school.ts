import { model, Schema } from 'mongoose';

import { ESchoolCode, ESchool, ISchool, ISchoolDocument } from '../interfaces';

const SchoolSchemaField: Record<keyof ISchool, unknown> = {
  school: { type: String, enum: ESchool, required: true },
  schoolCode: { type: String, enum: ESchoolCode, required: true },
  department: { type: Object, required: true },
};

const SchoolSchema = new Schema(SchoolSchemaField, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});

const SchoolModel = model<ISchoolDocument>('School', SchoolSchema);

export { SchoolModel };
