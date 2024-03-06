import { Document } from 'mongoose';

import { EUserType } from './index';

export interface IWorker {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  dlcfCampus: string;
  department: string;
  school: string;
  level: string;
  centre: string;
  hall: string;
  imageUrl: {
    path: string;
    fileName: string;
  };
  unit: string;
  residentialAddress: string;
  userType: EUserType;
  last_login: Date;
  verified: boolean;
  token: string;
}

export interface WorkerInputDTO {
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
  unit: string;
  dlcfCampus: string;
  residentialAddress: string;
}

export interface IWorkerDocument extends IWorker, Document {}
