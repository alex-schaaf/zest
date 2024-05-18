import "@mantine/core/styles.css"
import "./App.css"

import { AppShell, Burger, MantineProvider, NavLink } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import DashboardPage from "./pages/Dashboard.page"
import ActivitiesPage from "./pages/Activites.page"
import SettingsPage from "./pages/Settings.page"
import SignInPage from "./pages/SignIn.page"
import SignUpPage from "./pages/SignUp.page"
import { Outlet } from "react-router-dom"
import { NavLink as NavLinkRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "/dashboard",
        Component: DashboardPage,
      },
      {
        path: "/activities",
        Component: ActivitiesPage,
      },
      {
        path: "/settings",
        Component: SettingsPage,
      },
      // {
      //   path: "/auth/strava",
      //   Component: StravaOAuthRedirect,
      // },
    ],
  },
  {
    path: "/sign-in",
    Component: SignInPage,
  },
  {
    path: "/sign-up",
    Component: SignUpPage,
  },
])

function Layout() {
  const [opened, { toggle }] = useDisclosure()
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="sm"
    >
      <AppShell.Header>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      </AppShell.Header>
      <AppShell.Navbar p="xs">
        <NavLink to="/" label="Dashboard" component={NavLinkRouter} />
        <NavLink
          to="/activities"
          label="Activities"
          component={NavLinkRouter}
        />
        <NavLink to="/settings" label="Settings" component={NavLinkRouter} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <RouterProvider router={router}></RouterProvider>{" "}
    </MantineProvider>
  )
}

export default App
