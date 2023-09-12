import { Document, model, ObjectId, Schema } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
}

const userSchema = new Schema({
  _id: {
    type: Schema.ObjectId,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
