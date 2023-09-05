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

const ActivityWeeklyBarChart: React.FC<Props> = ({
  activities,
  width,
  height,
}) => {
  const data: { distance: number; week: number }[] = useMemo(
    () => binActivitiesWeekly(activities),
    [activities]
  )

  const distanceMax = Math.max(...data.map(({ distance }) => distance))

  const margin = { top: 10, right: 0, bottom: 10, left: 30 }
  const xMax = width - margin.left - margin.right
  const yMax = height - margin.bottom
  const yMin = margin.top

  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.week.toString()))
    .range([margin.left, xMax])

  const yScale = d3.scaleLinear().domain([0, distanceMax]).range([yMin, yMax])

  if (height === 0) return null

  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.blue[400]} />
          <stop offset="100%" stopColor={colors.blue[500]} />
        </linearGradient>
      </defs>

      {data.map(({ week, distance }) => {
        return (
          <rect
            key={week}
            x={xScale(week.toString())}
            y={yScale(distanceMax - distance)}
            width={xScale.bandwidth() * 0.9}
            height={yScale(distance) - yMin}
            fill="url(#Gradient2)"
          ></rect>
        )
      })}
      <text x={xScale("0")} y={yScale(distanceMax + 0.75)}>
        0
      </text>
      <text x={xScale("0")} y={yScale(distanceMax / 2 + 1)}>
        {(distanceMax / 2).toFixed(0)}
      </text>
      <text x={xScale("0")} y={yScale(1)}>
        {distanceMax.toFixed(0)}
      </text>
      <line
        x1={xScale("1")}
        x2={xScale("52")}
        y1={yScale(distanceMax) + 0.5}
        y2={yScale(distanceMax) + 0.5}
        stroke={colors.gray[900]}
        strokeWidth={1}
      />
      <line
        x1={xScale("1") || 0 + 0.5}
        x2={xScale("1") || 0 + 0.5}
        y1={yScale(0)}
        y2={yScale(distanceMax)}
        stroke={colors.gray[900]}
        strokeWidth={1}
      />
    </svg>
  )
}

export default ActivityWeeklyBarChart

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
