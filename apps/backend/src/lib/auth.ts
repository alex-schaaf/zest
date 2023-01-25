import bcrypt from "bcrypt";

import jwt, { JwtPayload } from "jsonwebtoken";

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

export interface TokenPayload extends JwtPayload {
  userId: number;
}

export function encodeToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: 60 * 60 * 24,
  });
}

export function decodeToken(token: string): TokenPayload | null {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
}
