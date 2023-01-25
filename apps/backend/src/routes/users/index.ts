import { Prisma } from "@prisma/client";
import express from "express";
import { authTokenMiddleware } from "../../middleware";
import settingsService from "../../services/settingsService";
import userService from "../../services/userService";

const router = express.Router();

router.use(authTokenMiddleware);

router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await userService.find({ id: parseInt(userId) });
  return res.json({ ...user, passwordHash: undefined });
});

router.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const data: Prisma.UsersUpdateInput = req.body;

  const user = await userService.update({ id: parseInt(userId) }, data);
  return res.json({ ...user, passwordHash: undefined });
});

router.patch("/users/:userId/settings/:id", async (req, res) => {
  const { id } = req.params;
  const data: Prisma.SettingsUpdateInput = req.body;

  const settings = await settingsService.update({ id: parseInt(id) }, data);
  return res.json(settings);
});

export default router;
