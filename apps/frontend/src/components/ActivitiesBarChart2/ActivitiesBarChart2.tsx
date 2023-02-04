import { StravaActivities } from "@prisma/client"
import dayjs from "dayjs"
import React, { useMemo, useState } from "react"
import colors from "tailwindcss/colors"
import * as d3 from "d3"

interface Props {
  activities: StravaActivities[]
  width: number
  height: number
}

const getX = (value: number, barWidth: number): number => {
  return value * barWidth - barWidth / 2
}

const ActivitiesBarChart: React.FC<Props> = ({ activities, width, height }) => {
  const data = useMemo(() => binActivitiesWeekly(activities), [activities])

  const [tooltip, setTooltip] = useState<{
    x: number
    y: number
    distance: number
  } | null>(null)

  if (height === 0) return null

  const distanceMax = Math.max(...data.map(({ distance }) => distance))

  const margin = { top: 10, right: 10, bottom: 10, left: 10 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const barWidth = xMax / data.length

  const yScale = d3
    .scaleLinear()
    .domain([0, distanceMax * 1.1])
    .range([0, yMax])

  return (
    <svg
      height={height}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
      className="border-b border-gray-300"
    >
      {/* <rect height={height} width={width} fill={colors.red[100]} /> */}
      {/* <rect
        x={margin.left}
        y={margin.top}
        height={yMax}
        width={xMax}
        fill={colors.blue[100]}
      /> */}
      {data.map(({ week, distance }) => {
        const x = getX(week, barWidth)
        const y = yMax - yScale(distance)
        const barHeight = yMax - y + margin.top
        if (!distance) return <></>
        return (
          <g>
            <rect
              x={x}
              y={y}
              height={barHeight}
              width={barWidth - 1}
              key={week}
              fill={colors.blue[600]}
              // onMouseOver={(e) => {
              //   setTooltip({ x, y, distance })
              // }}
              // onMouseOut={(e) => {
              //   setTooltip(null)
              // }}
            />
            {distance && (
              <text
                x={x + (barWidth - 1) / 2}
                y={yMax + 2}
                // dx={distance < 10 ? 4 : 1}
                fill={colors.white}
                className="text-xs"
                dominant-baseline="middle"
                text-anchor="middle"
              >
                {distance.toFixed(0)}
              </text>
            )}
          </g>
        )
      })}
      {/* {tooltip && (
        <>
          <rect
            x={tooltip.x}
            y={tooltip.y}
            width={50}
            height={20}
            fill={colors.yellow[100]}
          />
          <text x={tooltip.x} y={tooltip.y * 0.95}>
            {tooltip.distance.toFixed(1)} km
          </text>
        </>
      )} */}
    </svg>
  )
}

export default ActivitiesBarChart

const binActivitiesWeekly = (activities: StravaActivities[]) => {
  const bins: Record<number, number> = {}
  for (let w = 1; w <= 52; w++) {
    bins[w] = 0
  }

  activities.forEach((activity) => {
    const date = dayjs(activity.startDate)

    if (date.year() < dayjs().year()) {
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
