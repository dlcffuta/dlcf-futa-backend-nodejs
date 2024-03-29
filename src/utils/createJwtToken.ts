import jwt from 'jsonwebtoken';

import { JWT_EXPIRATION, ADMIN_JWT_SECRET } from '../config';
import { EUserType } from '../interfaces';

export type JwtPayload = {
  user_id: string;
  is_verified: boolean;
  role: EUserType;
  permission: string;
  created_at?: string;
};

export const createJwtToken = (payload: JwtPayload): string => {
  const token = jwt.sign(payload, ADMIN_JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  return token;
};
