import express from "express";
import cors from "cors";
import Router from "./routes";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

app.use(Router);

const server = app.listen(3000, () => {
  console.log("Server ready at http://localhost:3000");
});
