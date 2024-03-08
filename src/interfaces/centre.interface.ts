import { Document } from 'mongoose';

import { EHall, EDlcfCampus } from './index';

export enum ECentre {
  ALEJOLOWO = 'alejolowo',
  APATAPITI = 'apatapiti',
  NORTHGATE = 'northgate',
  WESTGATE = 'westgate',
  IBULE = 'ibule',
}
export interface ICentre {
  name: ECentre;
  halls: string[] | EHall[];
  location: string;
  dlcfCampus: string | EDlcfCampus;
}

export interface ICentreDocument extends ICentre, Document {}
