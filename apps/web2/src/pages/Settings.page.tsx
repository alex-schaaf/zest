import { useUserContext } from "@/contexts/user-context"

import SettingsForm from "@/components/SettingsForm"

const SettingsPage = () => {
  const { user } = useUserContext()

  return (
    <>
      <SettingsForm user={user} />
    </>
  )
}

export default SettingsPage
