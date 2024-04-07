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
  const style = "text-sm px-2 py-1 rounded-sm font-medium flex gap-1 border"

  if (current === previous) {
    return (
      <>
        <span>-</span>
        <span>{unit}</span>
      </>
    )
  } else if (current > previous) {
    const ratio = current - previous
    return (
      <>
        <span className="text-success-500">{arrowUp}</span>
        <span>{ratio.toFixed(precision)}</span>
        <span>{unit}</span>
      </>
    )
  } else {
    const ratio = previous - current
    return (
      <>
        <span className="text-danger-500">{arrowDown}</span>
        <span>{ratio.toFixed(precision)}</span>
        <span>{unit}</span>
      </>
    )
  }
}

export default TrendBadge
