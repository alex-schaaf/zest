import useActivities from "@/hooks/useActivities"
import ActivityTable from "./ActivityTable"

const ActivitiesPage = () => {
  const { activities, isError, isLoading } = useActivities({ take: 15 })

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError || !activities) {
    return <>Error</>
  }

  return (
    <>
      <ActivityTable activities={activities} />
    </>
  )
}

export default ActivitiesPage
