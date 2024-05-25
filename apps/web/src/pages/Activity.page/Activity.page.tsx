import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"

import axios from "@/lib/axios"
import { useUserContext } from "@/contexts/user-context"
import { Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core"
import { Activity } from "@/types/activity.types"
import { IconRun } from "@tabler/icons-react"
import classes from "./Activity.page.module.css"
import dayjs from "dayjs"

const ActivityPage = () => {
  const { user } = useUserContext()
  const { activityId } = useParams()

  const {
    isLoading,
    isError,
    data: activity,
  } = useQuery<Activity>({
    queryKey: ["activity", { activityId }],
    queryFn: () =>
      axios
        .get(`/users/${user.id}/activities/${activityId}`)
        .then((res) => res.data),
  })

  if (isLoading) {
    return <>Loading...</>
  }

  if (isError || activity === undefined) {
    return <>Error</>
  }

  return (
    <Stack p="md">
      <Group>
        <IconRun />
        <Text size="sm">{activity.id.toString()}</Text>
        <Text size="sm">
          {dayjs(activity.startDate).format("YYYY-MM-DD HH:mm")}
        </Text>
      </Group>
      <SimpleGrid cols={4}>
        <ValueCard
          title="Distance"
          value={(activity.distance / 1000).toFixed(1)}
          unit="km"
        />
        <ValueCard
          title="Duration"
          value={dayjs.duration(activity.time, "seconds").format("HH:mm:ss")}
        />
        <ValueCard
          title="Pace"
          value={(1000 / activity.speed / 60).toFixed(1)}
        />
        <ValueCard
          title="Elevation Gain"
          value={activity.elevationGain.toFixed(0)}
          unit="m"
        />
      </SimpleGrid>
    </Stack>
  )
}

export default ActivityPage

interface ValueCardProps {
  title: string
  value: string
  unit?: string
}

const ValueCard: React.FC<ValueCardProps> = (props) => {
  return (
    <Paper withBorder p="md" ta="center">
      <Stack>
        <Text size="xs" c="dimmed" className={classes.title}>
          {props.title}
        </Text>
        <Text className={classes.value}>
          {props.value} {props.unit}
        </Text>
      </Stack>
    </Paper>
  )
}
