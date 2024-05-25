import React, { useMemo } from "react"
import dayjs, { Dayjs } from "dayjs"
import { useSearchParams } from "react-router-dom"
import { Activity } from "@/types/activity.types"
import classNames from "classnames"
import classes from "./ActivitiesCalendar.module.css"
import { IconRun } from "@tabler/icons-react"
import { getCalendarDayActivities, getCalendarDays } from "./lib"
import { Box, SimpleGrid, Stack, Text } from "@mantine/core"

interface Props {
  activities: Activity[]
}

const ActivitiesCalendar: React.FC<Props> = ({ activities }) => {
  const [searchParams, _] = useSearchParams()

  let date = dayjs(
    searchParams.get("date") || dayjs().startOf("month").format("YYYY-MM-DD")
  )
  const calendarDays: Dayjs[] = useMemo(() => getCalendarDays(date), [date])
  const calendarDayActivities = useMemo(
    () => getCalendarDayActivities(calendarDays, activities),
    [calendarDays, activities]
  )

  return (
    <Stack>
      <SimpleGrid mt="lg" cols={7} ta="center">
        {calendarDays.slice(0, 7).map((day, idx) => (
          <Text size="sm" c="dimmed" key={idx}>
            {day.format("dddd")}
          </Text>
        ))}
      </SimpleGrid>
      <Box className={classes.calendar}>
        {calendarDays.map((day, idx) => {
          const activities = calendarDayActivities[day.format("YYYY-MM-DD")]

          return (
            <div
              className={classNames(classes.calendar__day, {
                [classes.day__other_month]: day.month() != date.month(),
                [classes.border_t]: idx >= 7,
                [classes.border_l]: day.isoWeekday() > 1,
                [classes.day__today]: day
                  .startOf("day")
                  .isSame(dayjs().startOf("day")),
              })}
              key={idx}
              data-cy={`calendar-day-${day.format("YYYY-MM-DD")}`}
            >
              <div className={classes.day__date}>{day.date()}</div>
              {activities.length > 0 && (
                <div className={classes.day__icon}>
                  <IconRun />
                </div>
              )}
              {activities.length > 0 && (
                <div className={classes.day__distance}>
                  {activities
                    .reduce((prev, curr) => prev + curr.distance / 1000, 0)
                    .toFixed(1)}{" "}
                  km
                </div>
              )}
            </div>
          )
        })}
      </Box>
    </Stack>
  )
}

export default ActivitiesCalendar
