import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser } from "../../interfaces";
import { CustomError } from "../../utils/response/custom-error/customError";

export const updateUser = async (userId: string, userInputDTO: any, next: NextFunction): Promise<IUser | void> => {
  try {
    const user = await UserModel.findById(userId);
    if (!user) next(new CustomError(404, "User does not exist"));
    const userUpdate = await UserModel.findByIdAndUpdate(userId, userInputDTO, { new: true });
    return userUpdate;
  } catch (error) {
    return next(new CustomError(500, "Internal server error ", error.message));
  }
};
