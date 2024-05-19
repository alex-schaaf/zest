import { useUserContext } from "@/contexts/user-context"

import SettingsForm from "@/components/SettingsForm"
import { Button, Card, Group, Stack, Text } from "@mantine/core"
import { IconKey } from "@tabler/icons-react"

const SettingsPage = () => {
  const { user } = useUserContext()

  const baseUrl = import.meta.env.VITE_BASE_URL

  const urlParams = new URLSearchParams({
    client_id: user.settings.stravaClientId?.toString() || "",
    redirect_uri: `${baseUrl}/auth/strava`,
    response_type: "code",
    scope: "activity:read_all",
  }).toString()

  const stravaUrl = new URL("https://www.strava.com/oauth/authorize")
  stravaUrl.search = urlParams

  return (
    <Stack>
      <SettingsForm user={user} />
      <Card maw={420} withBorder>
        <Stack>
          <Text size="lg" fw={700}>
            Strava Authorization
          </Text>
          <Text size="sm">
            Authorize with your Strava account to sync your activities.
          </Text>
          <Group>
            <Button
              color="orange"
              leftSection={<IconKey />}
              component="a"
              href={stravaUrl.toString()}
            >
              Authorize Strava
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  )
}

export default SettingsPage
