import useActivities from "@/hooks/useActivities"
import ActivityTable from "./ActivityTable"
import { Button, Flex, Stack } from "@mantine/core"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"

const ActivitiesPage = () => {
  const [urlSearchParams, setUrlSearchParams] = useSearchParams()

  useEffect(() => {
    if (!urlSearchParams.get("take") || !urlSearchParams.get("page")) {
      setUrlSearchParams({ take: "15", page: "0" })
    }
  }, [])

  const getAllSearchParams = () => {
    const params: Record<string, string> = {}
    for (let [key, value] of urlSearchParams.entries()) {
      params[key] = value
    }
    return params
  }

  const { activities, isError, isLoading } = useActivities({
    take: parseTake(urlSearchParams.get("take")),
    skip:
      parsePage(urlSearchParams.get("page")) *
      parseTake(urlSearchParams.get("take")),
  })

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError || !activities) {
    return <>Error</>
  }

  const handleNextPage = () => {
    setUrlSearchParams({
      ...getAllSearchParams(),
      page: (parsePage(urlSearchParams.get("page")) + 1).toFixed(0),
    })
  }

  const handlePreviousPage = () => {
    setUrlSearchParams({
      ...getAllSearchParams(),
      page: (parsePage(urlSearchParams.get("page")) - 1).toFixed(0),
    })
  }

  return (
    <Stack>
      <Flex justify="space-between">
        <Button
          variant="default"
          onClick={() => handlePreviousPage()}
          disabled={parsePage(urlSearchParams.get("page")) === 0}
        >
          Previous Page
        </Button>
        <Button
          variant="default"
          onClick={() => handleNextPage()}
          disabled={activities.length < 15}
        >
          Next Page
        </Button>
      </Flex>
      <ActivityTable activities={activities} />
    </Stack>
  )
}

export default ActivitiesPage

const parsePage = (page: string | null) => {
  if (!page) {
    return 0
  }
  return parseInt(page)
}

const parseTake = (take: string | null) => {
  if (!take) {
    return 15
  }
  return parseInt(take)
}
