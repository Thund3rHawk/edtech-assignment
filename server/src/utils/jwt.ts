import jwt from 'jsonwebtoken'
// import { config } from '../config/env';
import { TokenPayload } from '../types/index';

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, "shhhh", {
    expiresIn: '15m'
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, "shhhh", {
    expiresIn: '7d'
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, "shhhh") as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, "shhhh") as TokenPayload;
};