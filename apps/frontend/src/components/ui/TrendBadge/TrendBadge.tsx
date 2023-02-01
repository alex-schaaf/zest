import classNames from "classnames"

interface TrendBadgeProps {
  current: number
  previous: number
  unit?: string
  precision?: number
}

const TrendBadge: React.FC<TrendBadgeProps> = ({
  current,
  previous,
  unit,
  precision = 1,
}) => {
  const style = "text-sm px-2 py-1 rounded-sm"

  if (current === previous) {
    return (
      <div className={classNames(style, "bg-warning-50 text-warning-500")}>
        - {unit}
      </div>
    )
  } else if (current > previous) {
    const ratio = current - previous
    return (
      <div className={classNames(style, "bg-success-50 text-success-500")}>
        ↑ {ratio.toFixed(precision)} {unit}
      </div>
    )
  } else {
    const ratio = previous - current
    return (
      <div className={classNames(style, "bg-danger-50 text-danger-500")}>
        ↓ {ratio.toFixed(precision)} {unit}
      </div>
    )
  }
}

export default TrendBadge
