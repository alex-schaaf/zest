import express from "express";
import userService from "../services/userService";

const router = express.Router();

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await userService.find({ id: parseInt(id) });
  return res.json(user);
});

export default router;
