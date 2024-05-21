import { Button, Menu, NavLink, Text } from "@mantine/core"
import { NavLink as NavLinkRouter } from "react-router-dom"
import useStrava from "@/hooks/useStrava"
import {
  IconCalendarMonth,
  IconHistory,
  IconLayoutDashboard,
  IconLogout,
  IconRotate360,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react"
import classes from "./Navbar.module.css"
import { useAuthContext } from "./contexts/auth-context"

const links = [
  {
    link: "/",
    label: "Dashboard",
    icon: <IconLayoutDashboard className={classes.linkIcon} />,
  },
  {
    link: "/activities",
    label: "Activities",
    icon: <IconCalendarMonth className={classes.linkIcon} />,
  },
  {
    link: "/settings",
    label: "Settings",
    icon: <IconSettings className={classes.linkIcon} />,
  },
]

const Navbar = () => {
  const { isLoading, syncActivities, syncPreviousActivities } = useStrava()
  const { logout } = useAuthContext()

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links.map((linkData) => (
          <NavbarLink
            link={linkData.link}
            label={linkData.label}
            icon={linkData.icon}
            key={linkData.link}
          />
        ))}
      </div>

      <div className={classes.footer}>
        <Menu width={240}>
          <Menu.Target>
            <Button
              fullWidth
              loading={isLoading}
              color="primary"
              leftSection={<IconRotate360 />}
            >
              Synchronize
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item p={0}>
              <Button
                variant="transparent"
                color="dimmed"
                leftSection={<IconHistory />}
                fullWidth
                onClick={() => {
                  syncPreviousActivities()
                }}
              >
                <Text>Old Activities</Text>
              </Button>
            </Menu.Item>
            <Menu.Item p={0} mt={6}>
              <Button
                variant="light"
                leftSection={<IconSparkles />}
                fullWidth
                onClick={() => {
                  syncActivities()
                }}
              >
                <Text>New Activities</Text>
              </Button>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        <Button
          fullWidth
          variant="light"
          color="red"
          leftSection={<IconLogout />}
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </div>
    </nav>
  )
}

export default Navbar

interface NavbarLinkProps {
  link: string
  label: string
  icon: React.ReactNode
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ link, label, icon }) => {
  return (
    // <NavLink to={link} label={label} component={NavLinkRouter} leftSection={icon} />
    <NavLink
      to={link}
      label={label}
      component={NavLinkRouter}
      leftSection={icon}
      className={classes.link}
      fw={700}
    />
  )
}
