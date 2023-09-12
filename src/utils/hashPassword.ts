import bcrypt from "bcrypt";

export const hashPassword = (password: string, salt: number) => {
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
