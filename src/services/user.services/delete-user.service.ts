import { NextFunction } from 'express';

import { UserModel } from '../../models';
import { CustomError } from '../../utils/response/custom-error/customError';

export const deleteUser = async (userId: string, next: Function) => {
    try {
        const user = await UserModel.findById(userId);
        if (!user)
            return next(new CustomError(404, "User does not exist"));
        await UserModel.findByIdAndDelete(userId);
        return user;
    }
    catch (error) {
        return next(new CustomError(500, "Internal server error ", error.message));
    }
};