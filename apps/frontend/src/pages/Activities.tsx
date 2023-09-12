import Card from "@/components/ui/Card"
import ActivitiesCalendarContainer from "@/components/ActivitiesCalendarContainer"
import ActivitiesTableContainer from "@/components/ActivitiesTableContainer"
import { useEffect } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import dayjs from "dayjs"

const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  console.log("searchParams", searchParams)

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
