import express, { Response, Request } from "express";
import { connect } from "mongoose";
import bodyParser from "body-parser";
import Todo from "./src/models/Todo";

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

app.post("/create", async (req: Request, res: Response) => {
  const { title, description } = req.body;

  const existTitle = await Todo.findOne({ title });

  if (existTitle) {
    return res.json({ msg: "Title already exist", status: "500" });
  }

  let todo = {
    title,
    description,
  };

  const todoResponse = new Todo(todo);
  todoResponse.save();

  res.json({ todoResponse, status: "success" });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
