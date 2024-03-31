import Card from "@/components/ui/Card"
import { minutesToHoursAndMinutes } from "@/lib/time"
import React, { PropsWithChildren } from "react"
import TrendBadge from "../TrendBadge"

export const Title: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-sm text-gray-500">{props.children}</div>
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
    <Card className="">
      <Title>{props.title}</Title>
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
      <div className="text-sm flex gap-1 text-gray-500">
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
