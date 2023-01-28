import Card from "@/components/Card"
import DescriptionList from "@/components/DescriptionList"
import StravaAuthBtn from "@/components/StravaAuthBtn"
import { useUser } from "@/contexts/user-context"
import { Users, Settings } from "@prisma/client"

const formatDateStr = (s: string | number | Date | null) => {
  if (s == null) return ""
  return new Date(s).toString()
}

const options: {
  key: keyof Users
  name: string
  formatter?: (s: string | number | Date | null) => string
}[] = [
  { key: "id", name: "ID" },
  { key: "email", name: "EMail" },
  {
    key: "updatedAt",
    name: "Last updated",
    formatter: formatDateStr,
  },
]

const stravaOptions: {
  key: keyof Settings
  name: string
  formatter?: (s: string | number | Date | null) => string
}[] = [
  { key: "stravaClientId", name: "Client ID" },
  {
    key: "stravaTokenExpiresAt",
    name: "Token expires at",
    formatter: (s) => new Date(parseInt(s) * 1000).toString(),
  },
]

const SettingsView = () => {
  const { user } = useUser()

  return (
    <div className="flex flex-col gap-4">
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
            <div className="flex">
              <div className="flex-grow">
                <DescriptionList.Title>Strava</DescriptionList.Title>
                <DescriptionList.Subtitle>
                  Strava details and settings.
                </DescriptionList.Subtitle>
              </div>
              <div className="">
                <StravaAuthBtn />
              </div>
            </div>
          </DescriptionList.Header>
          {stravaOptions.map(({ key, name, formatter }, idx) => (
            <DescriptionList.Field idx={idx} key={idx}>
              <DescriptionList.Term>{name}</DescriptionList.Term>
              <DescriptionList.Description>
                <>
                  {formatter
                    ? formatter(user.settings[key])
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
