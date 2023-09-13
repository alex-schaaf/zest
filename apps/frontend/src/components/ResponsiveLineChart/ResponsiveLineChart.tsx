import React, { CSSProperties } from "react"
import * as d3 from "d3"
import { Dayjs } from "dayjs"

interface Props {
  data: { value: number; date: Dayjs }[]
}

// https://buildui.com/recipes/responsive-line-chart
const ResponsiveLineChart: React.FC<Props> = ({ data }) => {
  const xScale = d3
    .scaleTime()
    .domain([data[0].date, data[data.length - 1].date])
    .range([0, 100])

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data.map((d) => d.value)) ?? 0])
    .range([100, 0])

  const line = d3
    .line<(typeof data)[number]>()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.value))

  const d = line(data)

  if (!d) {
    return null
  }

  return (
    <div className="@container relative h-full w-full">
      <div
        className=""
        style={
          {
            "--marginTop": "6px",
            "--marginRight": "8px",
            "--marginBottom": "25px",
            "--marginLeft": "25px",
          } as CSSProperties
        }
      >
        {/* X axis */}
        <svg
          className="absolute inset-0
          h-[calc(100%-var(--marginTop))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
        >
          {data.map((day, i) => (
            <g key={i} className="overflow-visible font-medium text-gray-500">
              <text
                x={`${xScale(day.date)}%`}
                y="100%"
                textAnchor={
                  i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
                }
                fill="currentColor"
                className="@sm:inline hidden text-sm"
              >
                {day.date.format("dd")}
              </text>
              <text
                x={`${xScale(day.date)}%`}
                y="100%"
                textAnchor={
                  i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"
                }
                fill="currentColor"
                className="@sm:hidden text-xs"
              >
                {day.date.format("ddd")}
              </text>
            </g>
          ))}
        </svg>

        {/* Y axis */}
        <svg
          className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
        >
          <g className="translate-x-4">
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((value, i) => (
                <text
                  key={i}
                  y={`${yScale(+value)}%`}
                  alignmentBaseline="middle"
                  textAnchor="end"
                  className="text-xs tabular-nums text-gray-600"
                  fill="currentColor"
                >
                  {value}
                </text>
              ))}
          </g>
        </svg>
        {/* Chart area */}
        <svg
          className="
          absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
        >
          <svg
            viewBox="0 0 100 100"
            className="overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {yScale
              .ticks(8)
              .map(yScale.tickFormat(8, "d"))
              .map((active, i) => (
                <g
                  transform={`translate(0,${yScale(+active)})`}
                  className="text-gray-700"
                  key={i}
                >
                  <line
                    x1={0}
                    x2={100}
                    stroke="currentColor"
                    strokeDasharray="6,5"
                    strokeWidth={0.5}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              ))}
            {/* Line */}
            <path
              d={d}
              fill="none"
              className="text-gray-600"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* Markers */}
            {data.map((d) => (
              <path
                key={d.date.toString()}
                d={`M ${xScale(d.date)} ${yScale(d.value)} l 0.0001 0`}
                vectorEffect="non-scaling-stroke"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
                className="text-gray-400"
                stroke="currentColor"
              />
            ))}
          </svg>
        </svg>
      </div>
    </div>
  )
}

export default ResponsiveLineChart
