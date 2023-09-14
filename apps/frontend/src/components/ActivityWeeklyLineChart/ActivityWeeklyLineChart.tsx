import React, { useMemo } from "react"
import { StravaActivities } from "@prisma/client"
import * as d3 from "d3"
import colors from "tailwindcss/colors"
import dayjs from "dayjs"

interface Props {
  activities: StravaActivities[]
  width: number
  height: number
}

const ActivityWeeklLineChart: React.FC<Props> = ({
  activities,
  width,
  height,
}) => {
  const data: { distance: number; week: number }[] = useMemo(
    () => binActivitiesWeekly(activities),
    [activities],
  )

  if (height === 0) return null

  const distanceMax = Math.max(...data.map(({ distance }) => distance))

  const margin = { top: 10, right: 10, bottom: 4, left: 10 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = d3
    .scaleLinear()
    .range([margin.left, xMax])
    .domain([0, data.length - 1])

  const yScale = d3
    .scaleLinear()
    .domain([distanceMax * 1.1, 0])
    .range([0, yMax])

  function generatePath(data: number[]) {
    let s = ""
    data.forEach((d, i) => {
      if (i === 0) {
        s += `M ${xScale(i)} ${yScale(d)}`
      } else if (i >= dayjs().isoWeek()) {
      } else {
        s += `L ${xScale(i)} ${yScale(d)}`
      }
    })

    return s
  }

  function generateAreaPath(data: number[]) {
    let s = `M ${xScale(0)} ${yScale(0)}`
    data.forEach((d, i) => {
      if (i == dayjs().isoWeek()) {
        s += ` L ${xScale(i - 1)} ${yScale(0)}`
      } else if (i > dayjs().isoWeek()) {
        return
      } else {
        s += ` L ${xScale(i)} ${yScale(d)}`
      }
    })

    return s
  }

  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        d={generateAreaPath(data.map((d) => d.distance))}
        fillOpacity={0.5}
        fill={colors.blue[100]}
      />
      <path
        d={generatePath(data.map((d) => d.distance))}
        stroke={colors.blue[400]}
        strokeWidth={2}
        fillOpacity={0}
      />
      {data.map(({ week, distance }) => {
        if (!distance) return null

        return (
          <>
            <path
              d={`M ${xScale(week - 1)} ${yScale(0)} L ${xScale(
                week - 1,
              )} ${yScale(distanceMax)}`}
              stroke={
                week == dayjs().isoWeek() ? colors.blue[500] : colors.gray[200]
              }
            />
            {week == dayjs().isoWeek() && (
              <text
                x={xScale(week - 0.65)}
                y={yScale(distance)}
                fill={colors.blue[500]}
              >
                {distance.toFixed(0)} km
              </text>
            )}
            <circle
              cx={xScale(week - 1)}
              cy={yScale(distance)}
              r={4}
              fill={"white"}
              strokeWidth={2}
              stroke={colors.blue[400]}
            />
          </>
        )
      })}
    </svg>
  )
}

export default ActivityWeeklLineChart

const binActivitiesWeekly = (activities: StravaActivities[]) => {
  const bins: Record<number, number> = {}
  for (let w = 1; w <= dayjs().isoWeeksInYear(); w++) {
    bins[w] = 0
  }

  activities.forEach((activity) => {
    const date = dayjs(activity.startDate)

    if (!date.isAfter(dayjs().startOf("year"))) {
      return
    }

    bins[date.isoWeek()] += activity.distance / 1000
  })

  return Object.entries(bins).map(([k, v]) => ({
    week: parseInt(k),
    distance: v,
    label: dayjs()
      .startOf("year")
      .startOf("month")
      .startOf("date")
      .add(parseInt(k), "week"),
  }))
}
