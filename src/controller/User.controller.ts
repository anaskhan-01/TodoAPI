import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { TUser } from "../types/User";
import { comparePassword, hashPassword } from "../utils/hashPassword";

const checkByUsername = async (username: Pick<TUser, "username">) => {
  const userNameExist: TUser | null = await User.findOne({ username });
  return userNameExist;
};

export const createUser = async (req: Request, res: Response) => {
  const { name, username, password } = req.body;

  if (name === "" || username === "" || password === "") {
    return res.json({ msg: "All fields are required", status: "500" });
  }

  const userNameExist = await checkByUsername(username);
  if (userNameExist) {
    return res.json({ msg: "Username already exist", status: "500" });
  }

  const user: TUser = {
    name,
    username,
    password: await hashPassword(password, 10),
  };

  const userResponse = new User(user);
  userResponse.save();

  res.json({ msg: "User created successfully", status: "200" });
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const userNameExist = await checkByUsername(username);
  if (!userNameExist) {
    return res.json({ msg: "Invalid credentials", status: "500" });
  }

  const isPasswordMatch = await comparePassword(
    password,
    userNameExist.password
  );

  if (!isPasswordMatch) {
    return res.json({ msg: "Invalid credentials", status: "500" });
  }

  //res.json(userNameExist);
  const SECRET = "your-secret-key";
  const payload = {
    _id: userNameExist._id,
    name: userNameExist.name,
  };

  const token = jwt.sign(payload, SECRET);

  res.json({ token: token });
};
