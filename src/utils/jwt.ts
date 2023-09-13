import JWT from "jsonwebtoken";

type Payload = {
  _id: string;
};

export const generateToken = (payload: Payload) => {
  return JWT.sign(payload, "THIS_IS_MY_SECRET_KEY", { expiresIn: "1d" });
};
