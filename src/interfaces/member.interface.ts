import { Document } from 'mongoose';

export interface IMember {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    department: string;
    school: string;
    level: string;
    centre: string;
    hall: string;
    imageUrl: string;
    userType: string;
    last_login: Date;
    verified: boolean;
    token: string;
}
  
export enum EUserType {
    SUPER_ADMIN = "super_admin",
    ADMIN = "admin",
    MEMBER = "member",
    UNIT_HEAD = "unit_head",
    HALL_REP = "hall_rep",
    CENTRE_COORDINATOR = "centre_coordinator",
    SCHOOL_REP = "school_rep",
    WORKER = "worker",
    STUDENT_LEADER = "student_leader",
    PASTOR_LEADER = "pastor_leader",
}

export interface MemberInputDTO { 
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phoneNumber: string;
    department: string;
    school: string;
    level: string;
    centre: string;
    hall: string;
};


export interface UserLoginDTO { 
    email: string;
    password: string;
};

export interface IMemberDocument extends IMember, Document { }; 
