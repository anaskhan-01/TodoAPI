import express, { Request, Response } from "express";
import { TUser } from "../types/User";
import User from "../models/User";
import { hashPassword } from "../utils/hashPassword";

const checkByUsername = async (username: Pick<TUser, "username">) => {
  const userNameExist = await User.findOne({ username });
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
};
