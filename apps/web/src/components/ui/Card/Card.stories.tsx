import type { Meta, StoryObj } from "@storybook/react"

import Card from "./Card"

const meta: Meta<typeof Card> = {
  component: Card,
}

export default meta
type Story = StoryObj<typeof Card>

export const Filled: Story = {
  render: () => (
    <Card>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
        doloremque odit, aperiam asperiores, tempore, amet at non exercitationem
        illum eveniet voluptatibus et nisi delectus consectetur provident natus
        suscipit ut ex.
      </p>
    </Card>
  ),
}
export const Empty: Story = {
  render: () => <Card></Card>,
}
