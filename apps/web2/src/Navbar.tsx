import { Button, Group, NavLink, SimpleGrid } from "@mantine/core"
import { NavLink as NavLinkRouter } from "react-router-dom"
import useStrava from "@/hooks/useStrava"
import {
  IconCalendarMonth,
  IconLayoutDashboard,
  IconLogout,
  IconRotate360,
  IconSettings,
} from "@tabler/icons-react"
import classes from "./Navbar.module.css"

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
        <SimpleGrid cols={2}>
          <Button
            onClick={() => {
              syncActivities()
            }}
            fullWidth
            loading={isLoading}
            color="primary"
            leftSection={<IconRotate360 />}
          >
            Sync New
          </Button>
          <Button
            onClick={() => {
              syncPreviousActivities()
            }}
            fullWidth
            loading={isLoading}
            variant="light"
            color="primary"
            leftSection={<IconRotate360 />}
          >
            Sync Old
          </Button>
        </SimpleGrid>
        <Button
          disabled
          fullWidth
          variant="default"
          color="red"
          leftSection={<IconLogout />}
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
