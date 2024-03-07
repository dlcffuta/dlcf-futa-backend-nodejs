import { Document } from 'mongoose';

export enum EGender {
  MALE = 'male',
  FEMALE = 'female',
}
export interface IMember {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: EGender;
  department: string;
  dlcfCampus: string;
  school: string;
  level: ELevel;
  centre: string;
  hall: string;
  imageUrl: {
    path: string;
    fileName: string;
  };
  userType: EUserType;
  residentialAddress: string;
  last_login: Date;
  verified: boolean;
  token: string;
}

export enum ELevel {
  LEVEL_100 = '100',
  LEVEL_200 = '200',
  LEVEL_300 = '300',
  LEVEL_400 = '400',
  LEVEL_500 = '500',
  GRAD = 'grad',
  UABS = 'uabs',
  PRE_DEGREE = 'pre-degree',
  POST_GRAD = 'post-grad',
}

export enum EUserType {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MEMBER = 'member',
  UNIT_HEAD = 'unit_head',
  HALL_REP = 'hall_rep',
  CENTRE_COORDINATOR = 'centre_coordinator',
  SCHOOL_REP = 'school_rep',
  WORKER = 'worker',
  STUDENT_LEADER = 'student_leader',
  PASTOR_LEADER = 'pastor_leader',
  DLCF_CAMPUS = 'dlcf_campus',
}

export enum EDlcfCampus {
  FUTA = 'futa',
  UNIMED = 'unimed',
  OTHERS = 'others',
}

export enum ESchool {
  SEET = 'seet',
  SLIT = 'slit',
  SAAT = 'saat',
  SET = 'set',
  SOS = 'sos',
  SBMS = 'sbms',
  SCS = 'scs',
  SEMS = 'sems',
  SLS = 'sls',
  SOC = 'soc',
  SBCS = 'sbcs',
  CHS = 'chs',
  SPS = 'sps',
}

export interface MemberInputDTO {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phoneNumber: string;
  department: string;
  gender: EGender;
  school: string;
  level: ELevel;
  centre: string;
  hall: string;
  dlcfCampus: string;
  residentialAddress: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}

export interface IMemberDocument extends IMember, Document {}
