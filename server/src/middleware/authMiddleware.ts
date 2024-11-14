import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../types/requests/UserRequest";

const secretKey = process.env.JWT_SECRET || "1234567";

export const authenticateJWT = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }

      req.user = user as { id: number; username: string };
      next();
    });
  } else {
    res.status(401).json({ message: "Token not found" });
  }
};
