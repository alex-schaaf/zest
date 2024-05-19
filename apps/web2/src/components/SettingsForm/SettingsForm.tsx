import { Settings, UserWithSettings } from "@/types/user.types"
import { Box, Button, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"

import { IconDeviceFloppy } from "@tabler/icons-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { notifications } from "@mantine/notifications"

type SettingsFormValues = Pick<UserWithSettings, "email"> & {
  settings: Pick<Settings, "stravaClientId" | "stravaClientSecret">
}

interface Props {
  user: UserWithSettings
}

const SettingsForm: React.FC<Props> = ({ user }) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (values: Partial<SettingsFormValues>) =>
      axios.patch(`/users/${user.id}`, values),
    onError: (error) => {
      notifications.show({
        title: "Error!",
        message: error.message,
        color: "red",
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      notifications.show({
        title: "Success!",
        message: "Your settings were saved.",
        color: "green",
      })
    },
  })

  const form = useForm<SettingsFormValues>({
    initialValues: {
      email: user.email,
      settings: {
        stravaClientId: user.settings.stravaClientId,
        stravaClientSecret: user.settings.stravaClientSecret,
      },
    },
  })

  const handleSubmit = (values: SettingsFormValues) => {
    const patchValues: Partial<SettingsFormValues> = {}
    if (form.isDirty("email")) {
      patchValues.email = values.email
    }
    if (form.isDirty("settings.stravaClientId")) {
      patchValues.settings = patchValues.settings || {}
      patchValues.settings.stravaClientId = values.settings.stravaClientId
    }
    if (form.isDirty("settings.stravaClientSecret")) {
      patchValues.settings = patchValues.settings || {}
      patchValues.settings.stravaClientSecret =
        values.settings.stravaClientSecret
    }
    mutation.mutate(patchValues)
  }

  return (
    <div>
      <Box maw={420}>
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Text mt={20} fw={700}>
            Personal
          </Text>
          <TextInput
            mt={10}
            label="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />

          <Text mt={20} fw={700}>
            Strava
          </Text>
          <TextInput
            mt={10}
            label="Strava Client ID"
            key={form.key("settings.stravaClientId")}
            {...form.getInputProps("settings.stravaClientId")}
          />
          <TextInput
            mt={10}
            label="Strava Client Secret"
            type="password"
            key={form.key("settings.stravaClientSecret")}
            {...form.getInputProps("settings.stravaClientSecret")}
          />

          <Button
            disabled={!form.isDirty()}
            mt={20}
            type="submit"
            leftSection={<IconDeviceFloppy />}
          >
            Save
          </Button>
        </form>
      </Box>
    </div>
  )
}

export default SettingsForm