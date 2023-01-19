import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import activitiesRouter from "./routes/activities";
import bodyParser from "body-parser";

export const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use(usersRouter);
app.use(activitiesRouter);

const server = app.listen(3000, () => {
  console.log("Server ready at http://localhost:3000");
});
