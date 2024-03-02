import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser } from "../../interfaces";
import { CustomError } from "../../utils/response/custom-error/customError";

export const getAllUsers = async (next: NextFunction): Promise<IUser[] | void> => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    return next(new CustomError(500, "Internal server error ", error.message));
  }
};
