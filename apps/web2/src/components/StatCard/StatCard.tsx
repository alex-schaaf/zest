import { Group, Paper, Text } from "@mantine/core"
import classes from "./StatCard.module.css"

import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react"

interface StatCardProps {
  title: string
  value: string
  diff: number
  unit?: string
  diffUnit?: string
  diffPrecision?: number
}

const StatCard: React.FC<StatCardProps> = (stat) => {
  const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="xs" c="dimmed" className={classes.title}>
          {stat.title}
        </Text>
      </Group>

      <Group align="flex-end" gap="xs" mt={25}>
        <Text className={classes.value}>
          {stat.value} {stat.unit}
        </Text>
        <Text
          c={stat.diff > 0 ? "green" : "red"}
          fz="sm"
          fw={500}
          className={classes.diff}
        >
          <span>
            {stat.diff.toFixed(stat.diffPrecision || 0)}
            {stat.diffUnit}
          </span>
          <DiffIcon size="1rem" stroke={1.5} />
        </Text>
      </Group>

      <Text fz="xs" c="dimmed" mt={7}>
        Compared to previous month
      </Text>
    </Paper>
  )
}

export default StatCard
