import { Button, NavLink } from "@mantine/core"
import { NavLink as NavLinkRouter } from "react-router-dom"
import useStrava from "./hooks/useStrava"

const Navbar = () => {
  const { isLoading, syncActivities } = useStrava()

  return (
    <>
      <NavLink to="/" label="Dashboard" component={NavLinkRouter} />
      <NavLink to="/activities" label="Activities" component={NavLinkRouter} />
      <NavLink to="/settings" label="Settings" component={NavLinkRouter} />
      <Button
        onClick={() => {
          syncActivities()
        }}
        loading={isLoading}
      >
        Sync Activities
      </Button>
    </>
  )
}

export default Navbar
