import express, { Request } from "express";
import { encodeToken, hash, validatePassword } from "../../lib/auth";
import userService from "../../services/userService";
import UserService from "../../services/userService";

const router = express.Router();

router.post(
  "/auth/login",
  async (req: Request<{}, {}, { email: string; password: string }>, res) => {
    const { email, password } = req.body;

    const user = await userService.find({ email });

    if (!user) {
      return res.status(401).end();
    }

    const isValidPassword = await validatePassword(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).end();
    }

    const token = encodeToken({ userId: user.id });

    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json(payload);
  }
);

router.post("/auth/logout", (req, res) => {
  return res.status(204).clearCookie("token").end();
});

router.post(
  "/auth/register",
  async (req: Request<{}, {}, { email: string; password: string }>, res) => {
    const { email, password } = req.body;

    const existingUser = await userService.find({ email });

    if (existingUser) {
      return res.status(400).end();
    }

    const newUser = await UserService.create({
      email,
      passwordHash: hash(password),
      settings: {
        create: {},
      },
    });

    if (newUser) {
      return res.status(201).end();
    }
    return res.status(500);
  }
);

export default router;
