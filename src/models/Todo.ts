import { Document, model, Schema } from "mongoose";

export interface ITodo extends Document {}

const todoSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    required: false,
  },
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
