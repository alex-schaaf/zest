import express from "express";
import cors from "cors";
import usersRouter from "./routes/users";
import activitiesRouter from "./routes/activities";
import authRouter from "./routes/auth";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { authTokenMiddleware } from "./middleware";

export const app = express();

const router = express.Router();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:5174", credentials: true }));

router.get("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

router.use(authRouter);
// @ts-ignore
router.use(authTokenMiddleware); // everything below is authenticated
router.use(usersRouter);
router.use(activitiesRouter);

app.use("/api/v1", router);

app.listen(3000, () => {
  console.log("Server ready at http://localhost:3000");
});
