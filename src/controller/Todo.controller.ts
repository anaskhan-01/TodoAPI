import express, { Request, Response } from "express";
import Todo from "../models/Todo";

const checkTitle = async (title: string) => {
  let existTitle = await Todo.findOne({ title });
  return existTitle;
};

const checkTodoById = async (id: string, _id: string) => {
  const idExist = await Todo.findOne({ userId: _id, _id: id });
  return idExist;
};

export const add = async (req: Request, res: Response) => {
  const { title, description, _id } = req.body;

  if (title === "") {
    return res.json({ msg: "Title cannot be empty", status: "500" });
  }

  let existTitle = await checkTitle(title);
  if (existTitle) {
    return res.json({ msg: "Title already exist", status: "500" });
  }

  let todo = {
    userId: _id,
    title,
    description,
  };

  const todoResponse = new Todo(todo);
  todoResponse.save();

  res.json({ todoResponse, status: "200" });
};

export const getAll = async (req: Request, res: Response) => {
  const { _id } = req.body;

  const todos = await Todo.find({ userId: _id });
  res.json({ todos, status: "200" });
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { _id } = req.body;

  const idExist = await checkTodoById(id, _id);
  if (!idExist) {
    res.json({ msg: "Todo not found", status: "500" });
  }
  await Todo.findByIdAndDelete(id);
  res.json({ msg: "Todo has been deleted successfully", status: "200" });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id, title, description, _id } = req.body;
  const idExist = await checkTodoById(id, _id);
  if (!idExist) {
    res.json({ msg: "Todo not found", status: "500" });
  }
  await Todo.findByIdAndUpdate(id, { title, description });
  res.json({ msg: "Todo has been updated successfully", status: "200" });
};
