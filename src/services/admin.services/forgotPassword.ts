import { NextFunction } from "express";
import { hashSync } from "bcryptjs";

import { AdminModel } from "../../models";
import { CustomError } from "../../utils/response/custom-error/customError";
import { IAdmin } from "../../interfaces";
import { SALT_ROUNDS } from "../../config";

export const forgotPasswordService = async({ email, newPassword }: { email: string, newPassword: string }, next: NextFunction): Promise<void | IAdmin> => {
    try {
        const admin = await AdminModel.findOne({ email });
        if (!admin) {
            return next(new CustomError(400, 'General', 'Email does not exist'));
        }

        admin.password = hashSync(newPassword, SALT_ROUNDS);
        await admin.save();

        return admin;  
    } catch (error) {
        return next(new CustomError(500, 'Raw', 'Internal server', error.message));
    }
}