import { connectDb } from "../utils/connection";
import { hashSync, hash } from "bcryptjs";

import { UserModel } from "../models";

import { AdminInputDTO, EUserType } from "../interfaces";
import {  admin } from "../config";

const adminSeeder = async () => {
  try {
    connectDb();

    const adminExist = await UserModel.exists({ email: admin.EMAIL });
    if (adminExist) {
      console.log("Admin already seeded");
      return;
    }

    let password = hashSync(admin.PASSWORD);
      
    const usersData: AdminInputDTO = {
      userType: EUserType.SUPER_ADMIN,
      firstName: admin.FIRSTNAME,
      lastName: admin.LASTNAME,
      phoneNumber: admin.PHONENUMBER,
      email: admin.EMAIL,
      password: password,
    };

    await UserModel.insertMany(usersData);
    console.log("Admin's seeded successfully");
  } catch (error) {
    console.error(new Error(error.message));
  }
};

adminSeeder();