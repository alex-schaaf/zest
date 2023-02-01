import React from "react"
import * as Label from "@radix-ui/react-label"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@/components/ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { useUser } from "@/contexts/user-context"

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface Inputs {
  stravaClientId: string
  stravaClientSecret: string
}

const SettingsStravaForm: React.FC<Props> = ({ setOpen }) => {
  const { user, settings } = useUser()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    defaultValues: { stravaClientId: "", stravaClientSecret: "" },
  })

  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (settingsPatch) =>
      axios.patch(
        `/users/${user.id}/settings/${user.settingsId}`,
        settingsPatch
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] })
      setOpen(false)
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const cleanedData = Object.entries(data)
      .filter(([_, v]) => v !== "")
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})
    mutation.mutate(cleanedData)
  }

  return (
    <form className="mb-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Label.Root className="LabelRoot">Client ID</Label.Root>
        <input
          type="text"
          placeholder={settings.stravaClientId?.toString()}
          {...register("stravaClientId", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <Label.Root className="LabelRoot">Client Secret</Label.Root>
        <input
          type="password"
          placeholder={"•".repeat(settings.stravaClientSecret?.length || 0)}
          {...register("stravaClientSecret")}
        />
      </fieldset>
      <Button intent="success" type="submit" isLoading={isSubmitting}>
        Save changes
      </Button>
    </form>
  )
}

export default SettingsStravaForm
