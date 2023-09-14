// Button.stories.ts|tsx

import type { Meta, StoryObj } from "@storybook/react"

import TrendBadge from "./TrendBadge"

const meta: Meta<typeof TrendBadge> = {
  component: TrendBadge,
}

export default meta
type Story = StoryObj<typeof TrendBadge>

export const Positive: Story = {
  render: () => <TrendBadge current={5} previous={0} />,
}

export const Negative: Story = {
  render: () => <TrendBadge current={0} previous={5} />,
}

export const Neutral: Story = {
  render: () => <TrendBadge current={0} previous={0} />,
}
