import { Prisma } from "@prisma/client";
import express from "express";
import settingsService from "../services/settingsService";
import userService from "../services/userService";

const router = express.Router();

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userService.find({ id: parseInt(id) });
  return res.json(user);
});

router.patch("/users/:id", async (req, res) => {
  const { id } = req.params;
  const data: Prisma.UsersUpdateInput = req.body;

  const user = await userService.update({ id: parseInt(id) }, data);
  return res.json(user);
});

router.patch("/settings/:id", async (req, res) => {
  const { id } = req.params;
  const data: Prisma.SettingsUpdateInput = req.body;

  const settings = await settingsService.update({ id: parseInt(id) }, data);
  return res.json(settings);
});

export default router;
