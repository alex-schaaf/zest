import type { Meta, StoryObj } from "@storybook/react"

import Button from "./Button"

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    intent: "primary",
    children: "Button",
  },
}

export const Secondary: Story = {
  args: {
    intent: "secondary",
    children: "Button",
  },
}

export const Danger: Story = {
  args: {
    intent: "danger",
    children: "Button",
  },
}

export const Success: Story = {
  args: {
    intent: "success",
    children: "Button",
  },
}
