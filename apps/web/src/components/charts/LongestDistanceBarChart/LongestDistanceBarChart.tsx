import React from "react"
import colors from "tailwindcss/colors"
import * as d3 from "d3"
import { Activities } from "@/types/activity.types"

interface Props {
  activities: Activities[]
  width: number
  height: number
}

const LongestDistanceBarChart: React.FC<Props> = ({
  activities,
  width,
  height,
}) => {
  const distanceMax = Math.max(...activities.map(({ distance }) => distance))

  const margin = { top: 0, right: 0, bottom: 0, left: 0 }
  const xMin = margin.left
  const xMax = width - margin.right - margin.left
  const yMax = height - margin.bottom
  const yMin = margin.top

  const yScale = d3
    .scaleBand()
    .domain(activities.map((_, i) => i.toString()))
    .range([margin.top, yMax])

  const xScale = d3.scaleLinear().domain([0, distanceMax]).range([xMin, xMax])

  return (
    <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={colors.blue[400]} />
          <stop offset="100%" stopColor={colors.blue[500]} />
        </linearGradient>
      </defs>

      {activities.map((activity, idx) => (
        <g key={idx}>
          <rect
            x={xScale(0)}
            y={yScale.bandwidth() * idx + yScale.bandwidth() * 0.1}
            width={xScale(activity.distance)}
            height={yScale.bandwidth() * 0.8}
            fill="url(#Gradient2)"
          />
          <text
            x={xScale(200)}
            y={yScale.bandwidth() * idx + yScale.bandwidth() * 0.7}
            fill="white"
            fontSize={14}
          >
            {(activity.distance / 1000).toFixed(1)}
          </text>
        </g>
      ))}

      <line
        x1={xScale(0)}
        x2={xScale(0)}
        y1={yScale("0")}
        y2={yScale.bandwidth() * activities.length}
        stroke="black"
        strokeWidth={2}
      />
    </svg>
  )
}

export default LongestDistanceBarChart
