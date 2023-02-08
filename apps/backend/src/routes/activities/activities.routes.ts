import express, { Request } from "express";

import stravaActivityService from "../../services/stravaActivityService";
import { Prisma, StravaActivities } from "@prisma/client";
import { SummaryActivity } from "strava-types";

const router = express.Router();

interface GetActivitiesQueryParams {
  start?: Date;
  end: Date;
}

router.get(
  "/users/:userId/activities",
  async (
    req: Request<{ userId: string }, {}, {}, GetActivitiesQueryParams>,
    res
  ) => {
    const { userId } = req.params;
    const { start, end } = req.query;

    const activities = await stravaActivityService.findMany({
      where: {
        userId: parseInt(userId),
        startDate: {
          gte: start,
          lte: end,
        },
        active: true,
        type: {
          equals: "Run",
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });
    return res.json(activities);
  }
);

router.post(
  "/users/:userId/activities",
  async (
    req: Request<{ userId: string }, {}, SummaryActivity[]>,
    res,
    next
  ) => {
    const { userId } = req.params;
    const data = req.body;

    if (Array.isArray(data)) {
      const activities: StravaActivities[] = [];
      data.forEach(async (obj) => {
        try {
          const act = await stravaActivityService.create(parseInt(userId), obj);
          activities.push(act);
        } catch (e) {}
      });
      return res.status(201).json(activities);
    } else {
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
  }
);

router.delete("/users/:userId/activities/:activityId", async (req, res) => {
  const { activityId } = req.params;
  const activity = await stravaActivityService.delete({
    id: parseInt(activityId),
  });

  res.status(200).json(activity);
});

export default router;
