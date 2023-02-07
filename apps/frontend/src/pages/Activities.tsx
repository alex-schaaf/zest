import React, { useState } from "react"
import * as Select from "@radix-ui/react-select"
import useActivities from "@/hooks/useActivities"
import Card from "@/components/ui/Card"
import ActivitiesTable from "@/components/ActivitiesTable"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import dayjs from "dayjs"
import Button from "@/components/ui/Button"
import Spinner from "@/components/ui/Spinner/Spinner"
import ActivitiesCalendar from "@/components/ActivitiesCalendar"

const options = [
  {
    value: "7",
    text: "Last 7 days",
  },
  {
    value: "30",
    text: "Last 30 days",
  },
  {
    value: "60",
    text: "Last 60 days",
  },
  {
    value: "180",
    text: "Last 180 days",
  },
  {
    value: "365",
    text: "Last 365 days",
  },
]

const Activities = () => {
  const [start, setStart] = useState("30")

  const { activities, isLoading } = useActivities(
    dayjs().startOf("day").subtract(parseInt(start), "days").toDate()
  )

  if (isLoading)
    return (
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )

  return (
    <div className="container mx-auto space-y-4">
      <Card className="">
        <Select.Root value={start} onValueChange={setStart}>
          <Select.Trigger>
            <Button>
              <Select.Value />
              <Select.Icon>
                <ChevronDownIcon />
              </Select.Icon>
            </Button>
          </Select.Trigger>

          <Select.Content className="rounded-lg border bg-white p-2 shadow-lg">
            {options.map(({ value, text }, idx) => (
              <Select.Item
                key={idx}
                value={value.toString()}
                className="relative flex items-center rounded-md px-8 py-2 text-sm hover:cursor-pointer"
              >
                <Select.ItemText>{text}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Card>
      {activities && (
        <Card>
          <ActivitiesCalendar date={dayjs()} activities={activities} />
        </Card>
      )}
      <Card>{activities && <ActivitiesTable activities={activities} />}</Card>
    </div>
  )
}

export default Activities
