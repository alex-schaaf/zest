import { prisma, Prisma, StravaActivities } from "@prisma/client";
import express from "express";
import settingsService from "../services/settingsService";
import stravaActivityService from "../services/stravaActivityService";
import userService from "../services/userService";
import { z } from "zod";
import { nextTick } from "process";

const router = express.Router();

router.get("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await userService.find({ id: parseInt(userId) });
  return res.json(user);
});

router.patch("/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const data: Prisma.UsersUpdateInput = req.body;

  const user = await userService.update({ id: parseInt(userId) }, data);
  return res.json(user);
});

router.patch("/settings/:id", async (req, res) => {
  const { id } = req.params;
  const data: Prisma.SettingsUpdateInput = req.body;

  const settings = await settingsService.update({ id: parseInt(id) }, data);
  return res.json(settings);
});

// const Activity = z.object({
//   id: z.number(),
//   type: z.string(),
//   distance: z.number(),
//   moving_time: z.number(),
//   average_speed: z.number(),
//   total_elevation_gain: z.number(),
//   start_date: z.coerce.date(),
// });

router.get("/users/:userId/activities", async (req, res) => {
  const { userId } = req.params;

  const activities = await stravaActivityService.findMany(parseInt(userId));
  return res.json(activities);
});

router.post("/users/:userId/activities", async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;

  if (Array.isArray(data)) {
    // const objs = data.map((d) => Activity.parse(d));

    const activities: StravaActivities[] = [];
    data.forEach(async (obj) => {
      try {
        const act = await stravaActivityService.create(parseInt(userId), obj);
        activities.push(act);
      } catch (e) {
        return;
      }
    });
    return res.status(201).json(activities);
  } else {
    // const obj = Activity.parse(data);

    try {
      const activity = await stravaActivityService.create(
        parseInt(userId),
        data
      );
      res.status(201);
      return res.json(activity);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          console.error(
            "There is a unique constraint violation, a new activity cannot be created with this id"
          );
          res.status(409).send(e);
        } else {
          next(e);
        }
      } else {
        next(e);
      }
    }
  }
});

export default router;

interface StravaActivity {
  id: number;
  type: string;
  distance: number;
  moving_time: number;
  average_speed: number;
  total_elevation_gain: number;
  start_date: Date;
}
