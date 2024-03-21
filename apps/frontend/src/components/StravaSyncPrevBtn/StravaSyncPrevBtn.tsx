import React from "react"
import Button from "@/components/ui/Button"
import useStravaSync from "@/hooks/useStravaSync"
import axios from "../../lib/axios"
import { useUser } from "@/contexts/user-context"
import dayjs from "dayjs"
import { StravaActivities } from "@prisma/client"
import useBoolean from "@/hooks/useBoolean"
import ToastMessage from "../ToastMessage/ToastMessage"

const StravaSyncPrevBtn: React.FC = () => {
  const { sync } = useStravaSync()
  const { user } = useUser()

  const { value: isLoading, setValue: setIsLoading } = useBoolean(false)
  const { value: isSuccess, setValue: setIsSuccess } = useBoolean(false)
  const { value: isFailure, setValue: setIsFailure } = useBoolean(false)

  return (
    <>
      <ToastMessage
        intent="success"
        open={isSuccess}
        onOpenChange={setIsSuccess}
        title="Success"
        message="Successfully synced older activities with Strava."
      />
      <ToastMessage
        intent="failure"
        open={isFailure}
        onOpenChange={setIsFailure}
        title="Something went wrong"
        message="Failed to sync older activities with Strava."
      />
      <Button
        intent="primary"
        isLoading={isLoading}
        onClick={async () => {
          setIsLoading(true)
          try {
            const activity: StravaActivities = await axios
              .get(
                `/users/${user.id}/activities?orderBy=startDate&order=asc&limit=1`
              )
              .then((res) => res.data)

            await sync({ before: dayjs(activity.startDate).unix() })
          } catch {
            setIsFailure(true)
          } finally {
            setIsSuccess(true)
            setIsLoading(false)
          }
        }}
      >
        Sync previous Activities
      </Button>
    </>
  )
}

export default StravaSyncPrevBtn
