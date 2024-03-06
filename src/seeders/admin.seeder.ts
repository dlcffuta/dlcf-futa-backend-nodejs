import { hashSync } from 'bcryptjs';

import { admin, super_admin, SALT_ROUNDS } from '../config';
import { AdminInputDTO, EUserType } from '../interfaces';
import { AdminModel } from '../models';
import { connectDb } from '../utils/connection';

const adminSeeder = async () => {
  try {
    connectDb();

    const adminExist = await AdminModel.exists({ email: admin.EMAIL });
    const superAdminExist = await AdminModel.exists({ email: admin.EMAIL });
    if (adminExist && superAdminExist) {
      console.log('Admin already seeded');
      return;
    }
    const adminPassword = hashSync(admin.PASSWORD, SALT_ROUNDS);
    const superPassword = hashSync(super_admin.PASSWORD, SALT_ROUNDS);

    const adminData: AdminInputDTO = {
      userType: EUserType.ADMIN,
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
