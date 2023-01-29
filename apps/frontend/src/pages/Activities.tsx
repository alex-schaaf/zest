import React from "react"
import * as Select from "@radix-ui/react-select"
import useActivities from "@/hooks/useActivities"
import classNames from "classnames"
import Card from "@/components/Card"
import ActivitiesTable from "@/components/ActivitiesTable"

const Activities = () => {
  const { activities, isLoading } = useActivities()

  return (
    <div className="container mx-auto space-y-4">
      <Card className="">
        <Select.Root>
          <Select.Trigger>
            <Select.Value placeholder="Select a time range..." />
          </Select.Trigger>
          <Select.Portal>
            <Select.Content>
              <Select.Item value={"7"}>Last 7 days</Select.Item>
              <Select.Item value={"7"}>Last month</Select.Item>
              <Select.Item value={"7"}>Last year</Select.Item>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </Card>
      <Card className="h-[800px] overflow-auto">
        {activities && <ActivitiesTable activities={activities} />}
      </Card>
    </div>
  )
}

export default Activities
