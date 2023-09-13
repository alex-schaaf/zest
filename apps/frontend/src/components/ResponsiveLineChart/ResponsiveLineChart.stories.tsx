import type { Meta, StoryObj } from "@storybook/react"

import ResponsiveLineChart from "./ResponsiveLineChart"
import dayjs from "dayjs"

const meta: Meta<typeof ResponsiveLineChart> = {
  component: ResponsiveLineChart,
}

export default meta

type Story = StoryObj<typeof ResponsiveLineChart>

export const Standard: Story = {
  args: {
    data: [
      { value: 0.4, date: dayjs() },
      { value: 1, date: dayjs().add(1, "day") },
      { value: 3, date: dayjs().add(2, "day") },
      { value: 0.43, date: dayjs().add(3, "day") },
      { value: 4.3, date: dayjs().add(4, "day") },
      { value: 7, date: dayjs().add(5, "day") },
      { value: 4.9, date: dayjs().add(6, "day") },
    ],
  },
  render: (args) => (
    <div className="grid grid-cols-2 gap-x-4 gap-y-12 p-4">
      <div className="col-span-2 h-60">
        <ResponsiveLineChart {...args} />
      </div>
      <div className="h-40">
        <ResponsiveLineChart {...args} />
      </div>
      <div className="h-40">
        <ResponsiveLineChart {...args} />
      </div>
    </div>
  ),
}
