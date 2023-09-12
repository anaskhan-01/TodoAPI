import bycrypt from "bcrypt";

export const hashPassword = (password: string, salt: number) => {
  return bycrypt.hash(password, salt);
};
