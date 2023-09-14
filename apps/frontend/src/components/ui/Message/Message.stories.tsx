import type { Meta, StoryObj } from "@storybook/react"

import Message from "./Message"

const meta: Meta<typeof Message> = {
  component: Message,
}

export default meta
type Story = StoryObj<typeof Message>

export const Success: Story = {
  render: () => <Message text="Text" intent="success" />,
}

export const Error: Story = {
  render: () => <Message text="Toital Distance" intent="error" />,
}
