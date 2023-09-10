import { Document, model, Schema } from "mongoose";

export interface ITodo extends Document {}

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Todo = model<ITodo>("Todo", todoSchema);

export default Todo;
