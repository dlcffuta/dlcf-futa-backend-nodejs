import { Document } from 'mongoose';

import { EUserType, IPermission } from './index';

export interface IAdmin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  imageUrl: {
    path: string;
    fileName: string;
  };
  userType: EUserType;
  permission: string | IPermission;
  last_login: Date;
  verified: boolean;
  token: string;
}

export interface AdminInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  userType: EUserType;
}

export interface IAdminDocument extends IAdmin, Document {}
