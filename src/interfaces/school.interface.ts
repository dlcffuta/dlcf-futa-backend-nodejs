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
  SEET = 'school of engineering and engineering technology',
  SLIT = 'school of logistic and innovation technology',
  SAAT = 'school of agriculture and agricultural technology',
  SET = 'school of environmental technology',
  SOPS = 'school of postgraduate studies',
  SBMS = 'school of basic medical sciences',
  SCS = 'school of clinical sciences',
  SEMS = 'school of earth and mineral sciences',
  SLS = 'school of life sciences',
  SOC = 'school of computing',
  SBCS = 'school of basic clinical sciences',
  CHS = 'college of health sciences',
  SPS = 'school of physical sciences',
}

export interface ISchool {
  school: string | ESchool;
  schoolCode: string | ESchoolCode;
  department: ICustomInterface;
}

export interface ISchoolDocument extends ISchool, Document {}
