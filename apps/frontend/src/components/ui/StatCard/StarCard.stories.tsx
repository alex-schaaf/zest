// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react"

import StatCard from "./StatCard"

const meta: Meta<typeof StatCard> = {
  component: StatCard,
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Positive: Story = {
  render: () => (
    <StatCard title="Toital Distance" value={15} previousValue={10} unit="km" />
  ),
}

export const Negative: Story = {
  render: () => (
    <StatCard title="Toital Distance" value={15} previousValue={20} unit="km" />
  ),
}

export const Neutral: Story = {
  render: () => (
    <StatCard title="Toital Distance" value={15} previousValue={15} unit="km" />
  ),
}
