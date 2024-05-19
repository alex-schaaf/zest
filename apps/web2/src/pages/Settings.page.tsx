import { useUserContext } from "@/contexts/user-context"

import SettingsForm from "@/components/SettingsForm"
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { IconCheck, IconKey } from "@tabler/icons-react"

const Value: React.FC<{ value: string | undefined; title: string }> = ({
  value,
  title,
}) => {
  const iconColor = value ? "green" : "red"
  const iconVariant = value ? "light" : undefined
  const iconSize = value ? "sm" : undefined
  const iconStyle = value ? { width: "70%", height: "70%" } : {}

  return (
    <Flex gap={5}>
      <ThemeIcon color={iconColor} variant={iconVariant} size={iconSize}>
        <IconCheck style={iconStyle} />
      </ThemeIcon>
      <Text size="md">{title}</Text>
    </Flex>
  )
}

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
      <Stack>
        <Title order={2}>Settings</Title>
        <SettingsForm user={user} />
      </Stack>
      <Stack maw={420}>
        <Title order={2}>Strava Authorization</Title>
        <Text size="sm">
          Authorize with your Strava account to sync your activities.
        </Text>
        <Flex gap="25">
          <Value
            value={user.settings.stravaAccessToken}
            title={"Access token"}
          />
          <Value
            value={user.settings.stravaRefreshToken}
            title={"Refresh token"}
          />
        </Flex>

        <Group>
          <Button
            color="orange"
            leftSection={<IconKey />}
            component="a"
            href={stravaUrl.toString()}
            disabled={!!user.settings.stravaAccessToken}
          >
            Authorize Strava
          </Button>
        </Group>
      </Stack>
    </Stack>
  )
}

export default SettingsPage
