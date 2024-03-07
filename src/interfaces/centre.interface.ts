import { Document } from 'mongoose';

import { EHall } from './index';
export enum ECentre {
  ALEJOLOWO = 'alejolowo',
  APATAPITI = 'apatapiti',
  NORTHGATE = 'north',
  WESTGATE = 'westgate',
  IBULE = 'ibule',
}
export interface ICentre {
  name: ECentre;
  halls: string[] | EHall[];
  location: string;
}

export interface CentreInputDTO {
  name: string;
  halls: string[];
  location?: string;
}

export interface ICentreDocument extends ICentre, Document {}
