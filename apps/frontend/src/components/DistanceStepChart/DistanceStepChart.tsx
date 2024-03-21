import React, { useMemo } from "react"

import { StravaActivities } from "@prisma/client"
import dayjs from "dayjs"
import colors from "tailwindcss/colors"
import * as d3 from "d3"

interface Props {
  activities: StravaActivities[]
  width: number
  height: number
}

const DistanceStepChart: React.FC<Props> = ({ activities, width, height }) => {
  const data = useMemo(
    () => (activities ? getData(activities) : []),
    [activities]
  )

  const margin = { top: 4, right: 4, bottom: 4, left: 4 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = d3
    .scaleLinear()
    .range([margin.left, xMax])
    .domain([0, data.length - 1])

  const yScale = d3
    .scaleLinear()
    .range([yMax, 0])
    .domain([
      0,
      Math.ceil(
        Math.max(
          ...Object.values(data?.map((d) => d.distanceThisMonth)),
          ...Object.values(data?.map((d) => d.distanceLastMonth))
        ) * 1.1
      ),
    ])

  function generatePath(data: number[]) {
    let s = ""
    data.forEach((d, i) => {
      if (i === 0) {
        s += `M ${xScale(i)} ${yScale(d)}`
      } else {
        s += `L ${xScale(i)} ${yScale(d)}`
      }
    })

    return s
  }

  const r = 4

  return (
    <svg width={width} height={height}>
      <path
        d={generatePath(data.map((d) => d.distanceLastMonth))}
        stroke={colors.gray[300]}
        strokeWidth={2}
        fillOpacity={0}
      />
      <path
        d={generatePath(data.map((d) => d.distanceThisMonth))}
        stroke={colors.blue[500]}
        strokeWidth={2}
        fillOpacity={0}
      />
      <circle
        cx={xScale(data.length - 1)}
        cy={yScale(data[data.length - 1].distanceLastMonth)}
        r={r}
        fill={colors.gray[300]}
      />
      <circle
        cx={xScale(0)}
        cy={yScale(data[0].distanceLastMonth)}
        r={r}
        fill={colors.gray[300]}
      />
      <circle
        cx={xScale(0)}
        cy={yScale(data[0].distanceThisMonth)}
        r={r}
        fill={colors.blue[500]}
      />
      <circle
        cx={xScale(data.length - 1)}
        cy={yScale(data[data.length - 1].distanceThisMonth)}
        r={r}
        fill={colors.blue[500]}
      />
    </svg>
  )
}

export default DistanceStepChart

const getData = (activities: StravaActivities[]) => {
  const now = dayjs()
  const last = now.subtract(1, "month")

  const thisMonth = cumsum(
    activities,
    now.startOf("month").toDate(),
    now.endOf("month").toDate()
  )
  const lastMonth = cumsum(
    activities,
    last.endOf("month").subtract(now.endOf("month").date(), "days").toDate(),
    last.endOf("month").toDate()
  )

  const data = []
  for (let i = 0; i < now.endOf("month").date(); i++) {
    data.push({
      distanceThisMonth: thisMonth[i].distance,
      distanceLastMonth: lastMonth[i].distance,
    })
  }

  return data
}

const cumsum = (activities: StravaActivities[], start: Date, end: Date) => {
  const data = []
  let sum = 0
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const day = dayjs(d)
    sum = activities
      .filter((a) => dayjs(a.startDate).isSame(day, "day"))
      .reduce((prev, curr) => prev + curr.distance, sum)

    data.push({ startDate: day.toDate(), distance: sum })
  }

  return data
}
