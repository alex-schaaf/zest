import bcrypt from "bcrypt";

const saltRounds = 10;

export function hash(password: string): string {
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  return passwordHash;
}
