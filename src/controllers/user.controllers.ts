import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

import { createUser, loginUser, getUserById, getAllUsers, updateUser } from "../services/user.services";

import { UserInputDTO, UserLoginDTO } from "../src/interfaces/user.interface";

@Service()
class UserController {
  constructor(
    private readonly create: typeof createUser,
    private readonly login: typeof loginUser,
    private readonly getById: typeof getUserById,
    private readonly getAll: typeof getAllUsers,
    private readonly update: typeof updateUser,
  ) {}

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.getById(req.jwtPayload.user_id, next);
      res.customSuccess(200, "Users retrieved successfully", users);
    } catch (error) {
      next(error);
    }
  };
  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserInputDTO = req.body;
      const newUser = await this.create(user, next);
      if (newUser != null) {
        res.customSuccess(201, "User created successfully", newUser);
      }
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user: UserLoginDTO = req.body;
      const loginUser = await this.login(user, next);
      if (loginUser != null) {
        res.customSuccess(200, "User logged in successfully", loginUser);
      }
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.getAll(next);
      if (users != null) {
        res.customSuccess(200, "Users retrieved successfully", users);
      }
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const updateUser = await this.update(req.jwtPayload.user_id, req.body, next);
      if (updateUser != null) {
        res.customSuccess(200, "User updated successfully", updateUser);
      }
    } catch (error) {
      next(error);
    }
  };
}
export default UserController;
