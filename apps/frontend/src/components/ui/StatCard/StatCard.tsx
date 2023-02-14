import Card from "@/components/ui/Card"
import { minutesToHoursAndMinutes } from "@/lib/time"
import React, { PropsWithChildren } from "react"
import TrendBadge from "../TrendBadge"

const Title: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="text-xs font-semibold text-gray-400">{props.children}</div>
  )
}

const Value: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-3xl font-bold">{props.children}</div>
}

interface StatCardProps {
  title: string
  value: number
  previousValue?: number
  unit?: string
  precision?: number
}

const StatCard: React.FC<StatCardProps> = (props) => {
  const isTime = ["min"].includes(props.unit || "")

  return (
    <Card className="flex-grow">
      <Title>{props.title}</Title>
      <div className="flex items-end justify-between">
        <Value>
          {isTime ? (
            <RenderTime value={props.value} />
          ) : (
            <>
              <span>{props.value.toFixed(props.precision || 0)}</span>
              <span>{props.unit}</span>
            </>
          )}
        </Value>
        {props.previousValue !== undefined && (
          <TrendBadge
            current={props.value}
            previous={props.previousValue}
            unit={props.unit}
            precision={props.precision}
          />
        )}
      </div>
    </Card>
  )
}

export default StatCard

const RenderTime: React.FC<{ value: number }> = ({ value }) => {
  const { hours, minutes } = minutesToHoursAndMinutes(value)
  return (
    <>
      {hours}h {minutes}min
    </>
  )
}
