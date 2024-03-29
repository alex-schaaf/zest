import Card from "@/components/ui/Card"
import ActivitiesCalendarContainer from "@/components/ActivitiesPage/ActivitiesCalendarContainer"
import ActivitiesTableContainer from "@/components/ActivitiesPage/ActivitiesTableContainer"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import dayjs from "dayjs"

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    if (searchParams.get("date") && searchParams.get("lastDays")) {
      return
    }

    setSearchParams({
      date: dayjs().startOf("month").format("YYYY-MM-DD"),
      lastDays: "30",
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  if (!searchParams.get("date") || !searchParams.get("lastDays")) {
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
