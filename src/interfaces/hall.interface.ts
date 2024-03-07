import { Document } from "mongoose";

export interface IHall {
    name: string;
    location:string;
    centre:string;
}
export interface HallInputDTO{
    location:string;
    name:string;
    centre:string;
}

export interface IHallDocument extends IHall , Document {};

