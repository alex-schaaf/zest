import React, { useEffect, useRef, useState } from "react"
import Card from "@/components/Card"
import DistanceStepChart from "../DistanceStepChart/DistanceStepChart"

const DistanceStepChartContainer: React.FC = () => {
  const ref = useRef<any>(null)

  const [{ width, height }, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }
  }, [])

  return (
    <Card className="">
      <div ref={ref} className="h-36">
        <DistanceStepChart width={width} height={height} />
      </div>
    </Card>
  )
}

export default DistanceStepChartContainer
