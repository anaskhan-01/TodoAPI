import express, { Request, Response } from "express";
import Todo from "../models/Todo";
export const checkTitle = async (title: string) => {
  let existTitle = await Todo.findOne({ title });
  return existTitle;
};

export const add = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const id = req.headers.authorization;
  console.log("---------------", req.headers, id);
  if (title === "") {
    return res.json({ msg: "Title cannot be empty", status: "500" });
  }

  let existTitle = await checkTitle(title);
  if (existTitle) {
    return res.json({ msg: "Title already exist", status: "500" });
  }

  let todo = {
    title,
    description,
  };

  const todoResponse = new Todo(todo);
  todoResponse.save();

  res.json({ todoResponse, status: "200" });
};

const checkTodoById = async (id: string) => {
  const idExist = await Todo.findById(id);
  return idExist;
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idExist = await checkTodoById(id);
  if (!idExist) {
    res.json({ msg: "Todo not found", status: "500" });
  }
  await Todo.findByIdAndDelete(id);
  res.json({ msg: "Todo has been deleted successfully", status: "200" });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, title, description } = req.body;
  const idExist = await checkTodoById(id);
  if (!idExist) {
    res.json({ msg: "Todo not found", status: "500" });
  }
  await Todo.findByIdAndUpdate(id, { title, description });
  res.json({ msg: "Todo has been updated successfully", status: "200" });
};
