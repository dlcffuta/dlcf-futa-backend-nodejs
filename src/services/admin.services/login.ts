import { compareSync } from 'bcryptjs';
import { NextFunction } from 'express';

import { EUserType } from '../../interfaces';
import { AdminModel, PermissionModel } from '../../models';
import { createJwtToken, JwtPayload } from '../../utils/createJwtToken';
import { CustomError } from '../../utils/response/custom-error/customError';

export const loginAdminService = async (
  { email, password }: { email: string; password: string },
  next: NextFunction,
): Promise<void | object> => {
  try {
    email = email.toLowerCase();
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return next(new CustomError(400, 'General', 'Email does not exist'));
    }

    const isPasswordValid = compareSync(password, admin.password);
    if (!isPasswordValid) {
      return next(new CustomError(400, 'General', 'Invalid email or password'));
    }
    if (admin.userType === EUserType.SUPER_ADMIN) {
      admin.verified = true;

      if (!admin.permission) {
        const permission = await PermissionModel.create({
          admin: admin.id,
          centre: { create: true, read: true, update: true, delete: true },
          member: { create: true, read: true, update: true, delete: true },
          worker: { create: true, read: true, update: true, delete: true },
          unit: { create: true, read: true, update: true, delete: true },
          hall: { create: true, read: true, update: true, delete: true },
          school: { create: true, read: true, update: true, delete: true },
          dlcfCampus: { create: true, read: true, update: true, delete: true },
          pastor: { create: true, read: true, update: true, delete: true },
          studentLeader: { create: true, read: true, update: true, delete: true },
        });
        admin.permission = permission.id;
        const payload: JwtPayload = {
          user_id: admin._id,
          is_verified: admin.verified,
          role: admin.userType,
          permission: permission.id as string,
          created_at: new Date().toISOString(),
        };
        const token = createJwtToken(payload);
        admin.last_login = new Date();
        admin.token = token;
        await admin.save();

        return { token };
      }

      const payload: JwtPayload = {
        user_id: admin._id,
        is_verified: admin.verified,
        role: admin.userType,
        permission: admin.permission as string,
        created_at: new Date().toISOString(),
      };
      const token = createJwtToken(payload);
      admin.last_login = new Date();
      admin.token = token;
      await admin.save();
    }

    admin.verified = true;
    if (!admin.permission) {
      const permission = await PermissionModel.create({
        admin: admin.id,
        centre: { create: true, read: true, update: true, delete: true },
        member: { create: true, read: true, update: true, delete: true },
        worker: { create: true, read: true, update: true, delete: true },
        unit: { create: true, read: true, update: true, delete: true },
        hall: { create: true, read: true, update: true, delete: true },
        school: { create: true, read: true, update: true, delete: true },
        pastor: { create: true, read: true, update: true, delete: true },
        studentLeader: { create: true, read: true, update: true, delete: true },
      });
      admin.permission = permission.id;
      const payload: JwtPayload = {
        user_id: admin._id,
        is_verified: admin.verified,
        role: admin.userType,
        permission: permission.id as string,
        created_at: new Date().toISOString(),
      };
      const token = createJwtToken(payload);
      admin.last_login = new Date();
      admin.token = token;
      await admin.save();

      return { token };
    }

    const payload: JwtPayload = {
      user_id: admin._id,
      is_verified: admin.verified,
      role: admin.userType,
      permission: admin.permission as string,
      created_at: new Date().toISOString(),
    };
    const token = createJwtToken(payload);
    admin.last_login = new Date();
    admin.token = token;
    await admin.save();

    return { token };
  } catch (error) {
    return next(new CustomError(500, 'Raw', 'Internal server', error.message));
  }
};
