import { Document } from 'mongoose';
import { ICustomInterface } from './custom.interface';

export enum ESchoolCode {
  SEET = 'seet',
  SLIT = 'slit',
  SAAT = 'saat',
  SET = 'set',
  SOPS = 'sops',
  SBMS = 'sbms',
  SCS = 'scs',
  SEMS = 'sems',
  SLS = 'sls',
  SOC = 'soc',
  SBCS = 'sbcs',
  CHS = 'chs',
  SPS = 'sps',
}

export enum ESchool {
  SEET = 'School of Engineering and Engineering Technology',
  SLIT = 'School of Logistic and Innovation Technology',
  SAAT = 'School of Agriculture and Agricultural Technology',
  SET = 'School of Environmental Technology',
  SOPS = 'School Of Postgraduate Studies',
  SBMS = 'School Of Basic Medical Sciences',
  SCS = 'School Of Clinical Sciences',
  SEMS = 'School of Earth and Mineral Sciences',
  SLS = 'School of Life Sciences',
  SOC = 'School of Computing',
  SBCS = 'School Of Basic Clinical Sciences',
  CHS = 'College Of Health Sciences',
  SPS = 'School of Physical Sciences',
}

export interface ISchool {
  school: string | ESchool;
  schoolCode: string | ESchoolCode;
  department: ICustomInterface;
}

export interface ISchoolDocument extends ISchool, Document {}
