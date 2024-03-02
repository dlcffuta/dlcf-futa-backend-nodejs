import { Document } from 'mongoose';
import { EUserType } from "./index"; 

export interface IAdmin {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    imageUrl: string;
    userType: string;
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
};

export interface IAdminDocument extends IAdmin, Document { }; 