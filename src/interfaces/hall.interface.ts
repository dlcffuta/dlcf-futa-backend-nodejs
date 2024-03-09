import { Document } from 'mongoose';

import { ECentre } from './index';

export enum EHall {
  SALVATION = 'salvation',
  PURITY = 'purity',
  PEACE = 'peace',
  REDEMPTION = 'redemption',
  RESCUE = 'rescue',
  AKINDEKO = 'akindeko',
  ZION = 'zion',
  REHOBOTH = 'rehoboth',
  PENTECOSTAL = 'pentecostal (adeniyi)',
  MEEKNESS = 'meekness (jadesola/futascoop)',
  GRACE = 'grace (jibowu)',
  FAITH = 'faith (abiola)',
  DOMINION = 'dominion',
  NEW_JERUSALEM = 'new jerusalem (awosika)',
  ABUNDANT_LIFE = 'abundant life (adeboye)',
  SUNSHINE = 'sunshine',
  IBULE = 'ibule',
  POWER = 'power',
  EXCEL = 'excel',
  BETHEL = 'bethel',
}

export interface IHall {
  name: EHall;
  centre: string | ECentre;
  location: string;
}

export interface IHallDocument extends IHall, Document {}
