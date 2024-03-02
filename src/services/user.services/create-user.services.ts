import { NextFunction } from "express";

import { UserModel } from "../../models";
import { IUser, UserInputDTO } from "../../interfaces/user.interface";
import { CustomError } from "../../utils/response/custom-error/customError";

export const createUser = async (userInputDTO: UserInputDTO, next: NextFunction): Promise<IUser | void> => {
  try {
    const { email } = userInputDTO;
    const user = await UserModel.findOne({ email });
    if (user) next(new CustomError(400, "User already exist"));
    const newUser = await UserModel.create(userInputDTO);
    delete newUser.password;
    return newUser;
  } catch (error) {
    return next(new CustomError(500, "Internal server error ", error.message));
  }
};
