import Card from "@/components/ui/Card"
import ActivitiesCalendarContainer from "@/components/ActivitiesCalendarContainer"
import ActivitiesTableContainer from "@/components/ActivitiesTableContainer"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import dayjs from "dayjs"

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (!searchParams.get("date")) {
      setSearchParams({
        date: dayjs().startOf("month").format("YYYY-MM-DD"),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  if (!searchParams.get("date")) {
    return null
  }

  return (
    <div className="container mx-auto space-y-4">
      <Card>
        <ActivitiesCalendarContainer />
      </Card>
      <Card>
        <ActivitiesTableContainer />
      </Card>
    </div>
  )
}

export default Activities
