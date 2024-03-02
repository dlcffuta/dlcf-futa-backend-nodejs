import { connectDb } from '../utils/connection';
import { hashSync, hash } from 'bcryptjs';

import { AdminModel } from '../models';

import { AdminInputDTO, EUserType } from '../interfaces';
import { admin, super_admin } from '../config';

const adminSeeder = async () => {
  try {
    connectDb();

    const adminExist = await AdminModel.exists({ email: admin.EMAIL });
    const superAdminExist = await AdminModel.exists({ email: admin.EMAIL });
    if (adminExist && superAdminExist) {
      console.log('Admin already seeded');
      return;
    }

    let adminPassword = hashSync(admin.PASSWORD);
    let superPassword = hashSync(super_admin.PASSWORD);

    const adminData: AdminInputDTO = {
      userType: EUserType.SUPER_ADMIN,
      firstName: admin.FIRSTNAME,
      lastName: admin.LASTNAME,
      phoneNumber: admin.PHONENUMBER,
      email: admin.EMAIL,
      password: adminPassword,
    };

    const superAdminData: AdminInputDTO = {
      userType: EUserType.SUPER_ADMIN,
      firstName: super_admin.FIRSTNAME,
      lastName: super_admin.LASTNAME,
      phoneNumber: super_admin.PHONENUMBER,
      email: super_admin.EMAIL,
      password: superPassword,
    };
    await AdminModel.insertMany(adminData);
    await AdminModel.insertMany(superAdminData);
    console.log("Admin's seeded successfully");
  } catch (error) {
    console.error(new Error(error.message));
  }
};

adminSeeder();
