import express, { Request } from "express";
import { encodeToken, validatePassword } from "../../lib/auth";
import userService from "../../services/userService";

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

    return res.status(200).json({ token });
  }
);

export default router;
