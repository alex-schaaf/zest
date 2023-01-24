import React, { PropsWithChildren } from "react"
import Card from "../Card"

const Title: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="text-sm font-medium text-gray-400">{props.children}</div>
  )
}

const Subtitle: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-sm text-gray-400">{props.children}</div>
}

const Value: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-3xl font-bold">{props.children}</div>
}

interface StatProps {
  Title: React.FC<PropsWithChildren>
  Subtitle: React.FC<PropsWithChildren>
  Value: React.FC<PropsWithChildren>
}

export const Stat: React.FC<PropsWithChildren & { className?: string }> &
  StatProps = (props) => {
  return <Card className={props.className}>{props.children}</Card>
}

Stat.Title = Title
Stat.Subtitle = Subtitle
Stat.Value = Value

export default Stat
