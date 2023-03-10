import { Prisma } from "@prisma/client";
import express from "express";
import { decodeToken } from "../../lib/auth";

import settingsService from "../../services/settingsService";
import userService from "../../services/userService";

const router = express.Router();

router.get("/users", async (req, res) => {
  const { token } = req.cookies;

  // @ts-ignore
  const { userId } = decodeToken(token);

  const user = await userService.find({ id: parseInt(userId) });

  res.status(200).json({ ...user, passwordHash: undefined });
});

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

router.get("/users/:userId/settings/:settingsId", async (req, res) => {
  const { settingsId } = req.params;
  const settings = await settingsService.find({ id: parseInt(settingsId) });
  if (!settings) {
    return res.status(404).end();
  }
  return res.status(200).json(settings);
});

router.patch("/users/:userId/settings/:settingsId", async (req, res) => {
  const { settingsId } = req.params;
  const data: Prisma.SettingsUpdateInput = req.body;

  const settings = await settingsService.update(
    { id: parseInt(settingsId) },
    data
  );
  return res.status(200).json(settings);
});

export default router;
