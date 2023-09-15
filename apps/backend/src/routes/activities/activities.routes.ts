import express, { Request } from "express";
import stravaActivityService from "../../services/stravaActivityService";
import { Prisma, StravaActivities } from "@prisma/client";
import { SummaryActivity } from "strava-types";

const router = express.Router();

interface GetActivitiesQueryParams {
  start?: Date;
  end: Date;
  oldest?: boolean;
}

type GetActivitiesReqQuery = {
  skip?: string;
  take?: string;
  startDateGte?: Date;
  startDateLte?: Date;
  orderBy?: keyof StravaActivities;
  order?: "desc" | "asc";
};

router.get(
  "/users/:userId/activities",
  async (
    req: Request<{ userId: string }, {}, {}, GetActivitiesReqQuery>,
    res
  ) => {
    const { userId } = req.params;
    const { skip, take, orderBy, order, startDateGte, startDateLte } =
      req.query;

    const activities = await stravaActivityService.findMany({
      where: {
        userId: parseInt(userId),
        active: true,
        type: {
          equals: "Run",
        },
        startDate: {
          gte: startDateGte,
          lte: startDateLte,
        },
      },
      orderBy: {
        [orderBy || "startDate"]: order || "desc",
      },
      skip: skip ? parseInt(skip) : 0,
      take: parseInt(take || "30"),
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
      const activities: Omit<StravaActivities, "data">[] = [];
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
