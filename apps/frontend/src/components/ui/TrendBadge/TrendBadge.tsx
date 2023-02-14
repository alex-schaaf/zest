import classNames from "classnames"

interface TrendBadgeProps {
  current: number
  previous: number
  unit?: string
  precision?: number
}

const arrowUp = "↑"
const arrowDown = "↓"

const TrendBadge: React.FC<TrendBadgeProps> = ({
  current,
  previous,
  unit,
  precision = 1,
}) => {
  const style = "text-sm px-2 py-1 rounded-sm font-medium flex gap-1"

  if (current === previous) {
    return (
      <span className={classNames(style, "bg-warning-50 text-warning-500")}>
        <span>-</span>
        <span>{unit}</span>
      </span>
    )
  } else if (current > previous) {
    const ratio = current - previous
    return (
      <span className={classNames(style, "bg-success-50 text-success-500")}>
        <span>{arrowUp}</span>
        <span>{ratio.toFixed(precision)}</span>
        <span>{unit}</span>
      </span>
    )
  } else {
    const ratio = previous - current
    return (
      <span className={classNames(style, "bg-danger-50 text-danger-500")}>
        <span>{arrowDown}</span>
        <span>{ratio.toFixed(precision)}</span>
        <span>{unit}</span>
      </span>
    )
  }
}

export default TrendBadge
