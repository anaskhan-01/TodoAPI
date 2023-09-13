import express from "express";
import jwt from "jsonwebtoken";

type Payload = {
  _id: string;
};

const secretKey = process.env.SECRET_KEY || "your-secret-key";
function authenticateToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access denied");

  const payload: Payload | any = jwt.verify(token, secretKey);
  req = payload._id;
  next();
}

export default authenticateToken;
