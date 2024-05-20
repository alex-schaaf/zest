import { Burger, Button, Flex, Group, Text } from "@mantine/core"
import { IconBrandGithub, IconLemon } from "@tabler/icons-react"

interface HeaderProps {
  opened: boolean
  toggle: () => void
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Flex justify="space-between" align="center" h={60} px="sm">
      <Flex align="center" gap="sm">
        <Burger
          opened={props.opened}
          onClick={props.toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <IconLemon color="teal" />
        <Text fw={700} size="xl">
          zest
        </Text>
      </Flex>
      <Group>
        <Button
          variant="default"
          rightSection={<IconBrandGithub />}
          component="a"
          href="https://github.com/alex-schaaf/zest"
        >
          GitHub
        </Button>
      </Group>
    </Flex>
  )
}

export default Header
