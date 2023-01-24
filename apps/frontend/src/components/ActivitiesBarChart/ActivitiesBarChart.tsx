import Card from "../Card"
import { StravaActivities } from "@prisma/client"
import { AxisLeft, AxisBottom } from "@visx/axis"
import { Group } from "@visx/group"
import { scaleBand, scaleLinear, scaleTime } from "@visx/scale"
import { Bar } from "@visx/shape"
import dayjs, { Dayjs } from "dayjs"
import React, { useMemo } from "react"

interface Props {
  activities: StravaActivities[]
  width: number
  height: number
}

const ActivitiesBarChart: React.FC<Props> = ({ activities, width, height }) => {
  const data = useMemo(() => binActivitiesWeekly(activities), [activities])

  const margin = { top: 20, right: 50, bottom: 30, left: 30 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const { xScale, yScale } = useMemo(
    () => getChartScales(data, xMax, yMax),
    [data, xMax, yMax]
  )

  if (height === 0) return null

  return (
    <svg width={width} height={height}>
      <Group left={margin.left} top={margin.top}>
        {Object.entries(data).map(([week, distance], idx) => {
          const barX = xScale(
            dayjs(new Date(2023, 0, 1))
              .add(parseInt(week), "week")
              .toDate()
              .getTime()
          ) // xScale(parseInt(week));
          const barWidth = 15 //xScale.bandwidth

          const barHeight = yMax - yScale(distance)
          const barY = yMax - barHeight
          return (
            <Bar
              key={`bar-${week}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
            />
          )
        })}
        <AxisLeft scale={yScale} tickValues={[0, 5, 10, 15, 20, 25]} />
        <AxisBottom scale={xScale} top={yMax} />
      </Group>
    </svg>
  )
}

export default ActivitiesBarChart

const getChartScales = (
  data: Record<number, number>,
  xMax: number,
  yMax: number
) => {
  const distanceMax = Math.max(...Object.values(data))

  const dates = Object.keys(data).map((k) =>
    dayjs(new Date(2023, 0, 1)).add(parseInt(k), "week").toDate().getTime()
  )

  const xScale = scaleTime<number>({
    range: [0, xMax],
    round: true,
    domain: [Math.min(...dates), Math.max(...dates)],
    // padding: 0.4,
  })
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [0, Math.ceil(distanceMax * 1.1)],
  })

  return { xScale, yScale }
}

const binActivitiesWeekly = (
  activities: StravaActivities[]
): Record<number, number> => {
  const now = dayjs()
  const currentWeek = now.isoWeek()

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

  return bins
}
