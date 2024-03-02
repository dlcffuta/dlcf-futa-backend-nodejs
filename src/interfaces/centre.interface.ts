import { Document } from 'mongoose'; 

export enum ECentre {
    ALEJOLOWO = "alejolowo",
    APATAPITI = "apatapiti",
    NORTHGATE = "north",
    WESTGATE = "westgate",
    IBULE = "ibule",
}
export interface ICentre {
    name: ECentre;
    location: string;
}
  
export interface CentreInputDTO { 
    name: string;
};

export interface ICentreDocument extends ICentre, Document { }; 