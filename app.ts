import bodyParser from "body-parser";
import express from "express";
import { connect } from "mongoose";
import * as TodoController from "./src/controller/Todo.controller";
import * as UserController from "./src/controller/User.controller";
import authenticateToken from "./src/utils/tokenVefity";
const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://anas123:1HOOX1yA4d1QSMLW@cluster0.gjnkv7e.mongodb.net/Todo"
    );
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectDB();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/add", authenticateToken, TodoController.add);
app.get("/delete/:id", TodoController.deleteTodo);
app.post("/update", TodoController.updateTodo);

app.post("/createUser", UserController.createUser);
app.post("/login", UserController.loginUser);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
