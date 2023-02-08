import useActivities from "@/hooks/useActivities"
import dayjs from "dayjs"
import React, { useState } from "react"
import * as Select from "@radix-ui/react-select"
import ActivitiesTable from "../ActivitiesTable/ActivitiesTable"
import Button from "@/components/ui/Button"
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons"
import Spinner from "../ui/Spinner/Spinner"

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

const ActivitiesTableContainer: React.FC = () => {
  const [start, setStart] = useState("30")

  const { activities, isLoading } = useActivities(
    dayjs().startOf("day").subtract(parseInt(start), "days").toDate()
  )

  return (
    <div className="space-y-6">
      <div className="">
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
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : activities ? (
        <ActivitiesTable activities={activities} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ActivitiesTableContainer
