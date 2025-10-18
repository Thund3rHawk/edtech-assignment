import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export interface TokenPayload {
  userId: string;
  email: string;
}
