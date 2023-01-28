import React, { useMemo } from "react"
import Loading from "@/components/Loading"
import useActivities from "@/hooks/useActivities"

import { StravaActivities } from "@prisma/client"
import dayjs from "dayjs"
import colors from "tailwindcss/colors"
import { Group } from "@visx/group"
import { LinePath, Circle } from "@visx/shape"
import { curveMonotoneX } from "@visx/curve"
import { scaleLinear } from "@visx/scale"

interface Props {
  width: number
  height: number
}

const DistanceStepChart: React.FC<Props> = ({ width, height }) => {
  const { activities, isLoading } = useActivities()

  const data = useMemo(
    () => (activities ? getData(activities) : []),
    [activities]
  )

  if (isLoading || !data) {
    return <Loading />
  }

  const margin = { top: 4, right: 4, bottom: 4, left: 4 }

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const xScale = scaleLinear<number>({
    range: [0, xMax],
    round: true,
    domain: [0, data.length - 1],
  })
  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [
      0,
      Math.ceil(
        Math.max(...Object.values(data?.map((d) => d.distanceThisMonth))) * 1.1
      ),
    ],
  })

  return (
    <svg width={width} height={height} className="">
      <Group left={margin.left} top={margin.top}>
        <LinePath
          curve={curveMonotoneX}
          data={data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d.distanceLastMonth)}
          stroke={colors.gray[300]}
          strokeWidth={1.5}
        />
        <Circle
          cx={xScale(0)}
          cy={yScale(data[0].distanceThisMonth)}
          r={4}
          fill={colors.blue[600]}
        />
        <Circle
          cx={xScale(data.length - 1)}
          cy={yScale(data[data.length - 1].distanceThisMonth)}
          r={4}
          fill={colors.blue[600]}
        />
        <LinePath
          curve={curveMonotoneX}
          data={data}
          x={(_, i) => xScale(i)}
          y={(d) => yScale(d.distanceThisMonth)}
          stroke={colors.blue[600]}
          strokeWidth={1.5}
        />
        <Circle
          cx={xScale(data.length - 1)}
          cy={yScale(data[data.length - 1].distanceLastMonth)}
          r={4}
          fill={colors.gray[300]}
        />
      </Group>
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
