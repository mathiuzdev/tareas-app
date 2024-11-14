import { Request } from "express";
import jwt from "jsonwebtoken";

export interface UserRequest extends Request {
  user?: {
    id: number;
  };
  userJwt?: jwt.JwtPayload | string;
}
