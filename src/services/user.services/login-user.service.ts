import { NextFunction } from "express";

import { UserLoginDTO } from "interfaces";
import { UserModel } from "models";
import { createJwtToken } from "utils/createJwtToken";
import { CustomError } from "utils/response/custom-error/customError";

export const loginUser = async (userLoginDTO: UserLoginDTO, next: NextFunction): Promise<String | void> => {
  try {
    const { email, password } = userLoginDTO;
    const user = await UserModel.findOne({ email });
    if (!user) next(new CustomError(404, "User does not exist"));
    if (user.password !== password) next(new CustomError(400, "Invalid email or password"));
    const token = createJwtToken({
      user_id: user.id,
      email: user.email,
      role: user.role,
      is_verified: user.is_verified,
    });
    user.last_login = new Date();
    await user.save();
    return token;
  } catch (error) {
    return next(new CustomError(500, "Internal server error ", error.message));
  }
};
