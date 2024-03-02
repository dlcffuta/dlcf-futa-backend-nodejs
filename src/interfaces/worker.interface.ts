import { Document } from "mongoose";

import { EUserType } from "./index";

export interface IWorker {
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
    userType: EUserType;
};

export interface IWorkerDocument extends IWorker, Document { }; 
