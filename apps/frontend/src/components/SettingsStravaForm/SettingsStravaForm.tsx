import React from "react"
import { UserWithSettings } from "@/contexts/auth-context"
import * as Label from "@radix-ui/react-label"
import { SubmitHandler, useForm } from "react-hook-form"
import Button from "@/components/ui/Button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "@/lib/axios"
import { Settings } from "@prisma/client"

interface Props {
  user: UserWithSettings
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

interface Inputs {
  stravaClientId: string
  stravaClientSecret: string
}

const SettingsStravaForm: React.FC<Props> = ({ user, setOpen }) => {
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
      console.log("Mutation successful")
      queryClient.invalidateQueries({ queryKey: ["user"] })
      setOpen(false)
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    const cleanedData = Object.entries(data)
      .filter(([_, v]) => v !== "")
      .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {})

    console.log("cleanedData", cleanedData)
    mutation.mutate(cleanedData)
  }

  return (
    <form className="mb-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <Label.Root className="LabelRoot">Client ID</Label.Root>
        <input
          type="text"
          placeholder={user.settings.stravaClientId?.toString()}
          {...register("stravaClientId", { valueAsNumber: true })}
        />
      </fieldset>
      <fieldset>
        <Label.Root className="LabelRoot">Client Secret</Label.Root>
        <input
          type="password"
          placeholder={"•".repeat(
            user.settings.stravaClientSecret?.length || 0
          )}
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
