
import jwt from 'jsonwebtoken';
import { loginSchema } from '../validations/index';
import User  from '../models/User';
import bcrypt from 'bcrypt';

export const validateLoginData = (data: any) => {
  const { error, value } = loginSchema.validate(data);
  if (error) throw new Error(error.details[0].message);
  return value;
};

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Incorrect username or password");
  return user;
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) throw new Error("Incorrect username or password");
};

export const generateToken = (userId: number, email: string) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};
