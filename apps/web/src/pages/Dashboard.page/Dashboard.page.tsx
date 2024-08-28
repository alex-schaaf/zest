import useActivities from "@/hooks/useActivities"

import dayjs from "dayjs"
import { useMemo } from "react"
import MonthlyStatGrid from "./MonthlyStatGrid"
import {
  Anchor,
  Card,
  Text,
  Paper,
  SimpleGrid,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core"
import MonthlyDistanceSparkline from "./MonthlyDistanceSparkline"
import { useElementSize } from "@mantine/hooks"
import YearlyDistanceChart from "./YearlyDistanceChart"
import { useUserContext } from "@/contexts/user-context"

const DashboardPage = () => {
  const { activities, isLoading, isError } = useActivities()
  const { ref, width } = useElementSize()
  const { user } = useUserContext()
  const theme = useMantineTheme()

  const activitiesThisMonth = useMemo(() => {
    if (!Array.isArray(activities)) return []
    return activities.filter((activity) =>
      dayjs(activity.startDate).isAfter(dayjs().startOf("month"))
    )
  }, [activities])

  const activitiesLastMonth = useMemo(() => {
    if (!Array.isArray(activities)) return []
    return activities.filter(
      (activity) =>
        dayjs(activity.startDate).isAfter(
          dayjs().startOf("month").subtract(1, "month")
        ) && dayjs(activity.startDate).isBefore(dayjs().subtract(1, "month"))
    )
  }, [activities])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError || !Array.isArray(activities)) {
    return (
      <div>
        Failed to load activities.
        <div>
          <pre>{JSON.stringify(activities, null, 2)}</pre>
        </div>
      </div>
    )
  }

  if (!user.settings.stravaAccessToken) {
    return (
      <Paper
        withBorder
        p={15}
        style={{
          borderColor: theme.colors.primary[5],
        }}
      >
        <Stack>
          <Title order={2} style={{ color: theme.colors.primary[5] }}>
            Welcome!
          </Title>
          <Text>
            To get this thing to work, you need to connect your Strava account
            in the settings.
          </Text>
          <Text>
            <Anchor href="/settings">Click here</Anchor> to go to the Settings
            page.
          </Text>
        </Stack>
      </Paper>
    )
  }

  return (
    <Stack>
      <Title order={2}>This month</Title>
      <MonthlyStatGrid
        activities={activitiesThisMonth}
        previousActivities={activitiesLastMonth}
      />
      <SimpleGrid cols={3} spacing="lg">
        <Paper withBorder ref={ref} p={15}>
          <MonthlyDistanceSparkline
            activities={activities?.filter((activity) =>
              dayjs(activity.startDate).isAfter(
                dayjs().startOf("month").subtract(1, "month")
              )
            )}
            width={width}
            height={120}
          />
        </Paper>
      </SimpleGrid>
      <Title order={2}>Past year</Title>
      <Paper withBorder p="sm">
        <YearlyDistanceChart activities={activities} />
      </Paper>
    </Stack>
  )
}

export default DashboardPage
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.")
}
