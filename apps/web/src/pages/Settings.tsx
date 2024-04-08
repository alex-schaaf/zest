import Card from "@/components/ui/Card"
import DescriptionList from "@/components/ui/DescriptionList"
import StravaAuthBtn from "@/components/StravaAuthBtn"
import { useUser } from "@/contexts/user-context"
import { Users, Settings } from "@/types/user.types"
import {
  CheckIcon,
  Cross2Icon,
  LockClosedIcon,
  Pencil1Icon,
} from "@radix-ui/react-icons"
import { ReactNode, useState } from "react"
import Button from "@/components/ui/Button"
import * as Dialog from "@radix-ui/react-dialog"
import SettingsStravaForm from "@/components/SettingsPage/SettingsStravaForm"
import StravaSyncPrevBtn from "@/components/StravaSyncPrevBtn"

const formatDateStr = (s: string | number | Date | null | undefined) => {
  if (s == null) return ""
  return new Date(s).toString()
}

const options: {
  key: keyof Omit<Users, "passwordHash">
  name: string
  formatter?: (s: string | number | Date | null) => string
}[] = [
  { key: "id", name: "User ID" },
  { key: "email", name: "Email address" },
  {
    key: "updatedAt",
    name: "Last updated",
    formatter: formatDateStr,
  },
]

const stravaOptions: {
  key: keyof Settings
  name: string
  formatter?: (s: string | number | Date | null) => string | ReactNode
}[] = [
  { key: "stravaClientId", name: "Client ID" },
  {
    key: "stravaClientSecret",
    name: "Client Secret",
    formatter: (s) =>
      s ? (
        <CheckIcon className="text-success-700" />
      ) : (
        <Cross2Icon className="text-danger-700" />
      ),
  },
  {
    key: "stravaTokenExpiresAt",
    name: "Token expires at",
    formatter: (s) =>
      new Date(parseInt(s as unknown as string) * 1000).toString(),
  },
]

const SettingsView = () => {
  const { user } = useUser()

  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="container mx-auto flex flex-col gap-4">
      <Card>
        <DescriptionList>
          <DescriptionList.Header>
            <DescriptionList.Title>User Information</DescriptionList.Title>
            <DescriptionList.Subtitle>
              Personal details and settings.
            </DescriptionList.Subtitle>
          </DescriptionList.Header>
          {options.map(({ key, name, formatter }, idx) => (
            <DescriptionList.Field idx={idx} key={idx}>
              <DescriptionList.Term>{name}</DescriptionList.Term>
              <DescriptionList.Description>
                <>{formatter ? formatter(user[key]) : user[key]}</>
              </DescriptionList.Description>
            </DescriptionList.Field>
          ))}
        </DescriptionList>
      </Card>

      <Card>
        <DescriptionList>
          <DescriptionList.Header>
            <div className="flex items-start">
              <div className="flex-grow">
                <DescriptionList.Title>Strava</DescriptionList.Title>
                <DescriptionList.Subtitle>
                  Strava details and settings.
                </DescriptionList.Subtitle>
              </div>
              <div className="flex gap-2">
                <StravaSyncPrevBtn />
                <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
                  <Dialog.Trigger asChild>
                    <Button intent="success">
                      <Pencil1Icon /> Edit
                    </Button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content className="DialogContent">
                      <Dialog.Title className="DialogTitle">
                        Edit Strava Settings
                      </Dialog.Title>
                      <Dialog.Description className="DialogDescription">
                        Update your Strava API integration settings.
                      </Dialog.Description>
                      <SettingsStravaForm setOpen={setIsOpen} />
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <StravaAuthBtn>
                  <LockClosedIcon /> Authorize Strava
                </StravaAuthBtn>
              </div>
            </div>
          </DescriptionList.Header>
          {stravaOptions.map(({ key, name, formatter }, idx) => (
            <DescriptionList.Field idx={idx} key={idx}>
              <DescriptionList.Term>{name}</DescriptionList.Term>
              <DescriptionList.Description>
                <>
                  {formatter
                    ? formatter(user.settings[key] ?? null)
                    : user.settings[key]}
                </>
              </DescriptionList.Description>
            </DescriptionList.Field>
          ))}
        </DescriptionList>
      </Card>
    </div>
  )
}

export default SettingsView
