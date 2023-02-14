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

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

router.use(authRouter);
router.use(authTokenMiddleware); // everything below is authenticated
router.use(usersRouter);
router.use(activitiesRouter);

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server ready at http://localhost:${process.env.PORT}`);
});
