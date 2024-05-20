import dayjs from "dayjs"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import ActivitiesCalendarContainer from "./ActivitiesCalendarContainer"

const ActivitiesPage = () => {
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
    <div>
      <ActivitiesCalendarContainer />
    </div>
  )
}

export default ActivitiesPage
