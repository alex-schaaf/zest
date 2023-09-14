import dayjs from "dayjs"
import { rest } from "msw"
import { generateActivities } from "./data/activities"
import settings from "./data/settings"
import user from "./data/user"

const activities = generateActivities(dayjs().subtract(2, "year"))

export const handlers = [
  rest.get("http://localhost:3000/api/v1/users", (req, res, ctx) => {
    return res(ctx.json(user))
  }),
  rest.get(
    "http://localhost:3000/api/v1/users/*/settings/*",
    (req, res, ctx) => {
      return res(ctx.json(settings))
    },
  ),
  rest.get(
    "http://localhost:3000/api/v1/users/*/activities*",
    (req, res, ctx) => {
      return res(ctx.json(activities))
    },
  ),
]
