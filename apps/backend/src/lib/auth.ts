import bcrypt from "bcrypt";

import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const saltRounds = 10;

export function hash(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  return passwordHash;
}

export async function validatePassword(
  password: string,
  passwordHash: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, passwordHash);
  return result;
}

export function encodeToken(payload: JwtPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
}

export function decodeToken(token: string): string | JwtPayload | null {
  return jwt.verify(token, process.env.JWT_SECRET as string);
}
