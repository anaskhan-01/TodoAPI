import JWT from "jsonwebtoken";

export const generateToken = (payload: any) => {
  return JWT.sign(payload, "THIS_IS_MY_SECRET_KEY", { expiresIn: "1d" });
};
