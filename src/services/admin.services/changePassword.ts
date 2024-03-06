import { NextFunction } from "express";
import { compareSync, hashSync } from "bcryptjs";

import { AdminModel } from "../../models";
import { CustomError } from "../../utils/response/custom-error/customError";
import { IAdmin } from "../../interfaces";
import { SALT_ROUNDS } from "../../config";

export const changePasswordService = async(id: string, { oldPassword, newPassword }: { email: string, oldPassword: string, newPassword: string }, next: NextFunction): Promise<void | IAdmin> => {
    try {
        const admin = await AdminModel.findById(id);
        if (!admin) {
            return next(new CustomError(400, 'General', 'Email does not exist'));
        }

        const isPasswordValid = compareSync(oldPassword, admin.password);
        if (!isPasswordValid) {
            return next(new CustomError(400, 'General', 'Invalid email or password'));
        };
        admin.password = hashSync(newPassword, SALT_ROUNDS);
        await admin.save();
        return admin;

    } catch (error) {
        return next(new CustomError(500, 'Raw', 'Internal server', error.message));
    }
}
