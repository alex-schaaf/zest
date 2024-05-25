import dayjs from "dayjs"
import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"
import { Button, Flex, Title } from "@mantine/core"
import useActivities from "@/hooks/useActivities"
import ActivitiesCalendar from "./ActivitiesCalendar"

const CalendarPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  let date = dayjs(
    searchParams.get("date") || dayjs().startOf("month").format("YYYY-MM-DD")
  )

  const { activities, isLoading, isError } = useActivities({
    startDateGte: date.toDate(),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!activities) {
    return <div>No activities found...</div>
  }

  const goBackOneMonth = () => {
    setSearchParams((params) => {
      params.set("date", date.subtract(1, "month").format("YYYY-MM-DD"))
      return params
    })
  }

  const goForwardOneMonth = () => {
    setSearchParams((params) => {
      params.set("date", date.add(1, "month").format("YYYY-MM-DD"))
      return params
    })
  }

  return (
    <div>
      <Flex justify="space-between">
        <Button variant="default" size="xs" onClick={() => goBackOneMonth()}>
          <IconArrowLeft />
        </Button>
        <Title order={3}>{date.format("MMMM YYYY")}</Title>
        <Button
          variant="default"
          size="xs"
          onClick={() => goForwardOneMonth()}
          disabled={dayjs().startOf("month").isSame(date)}
        >
          <IconArrowRight />
        </Button>
      </Flex>
      <ActivitiesCalendar activities={activities} />
    </div>
  )
}

export default CalendarPage
