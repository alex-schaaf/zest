import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "./App.css"

import { AppShell, Burger, MantineProvider, NavLink } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom"
import DashboardPage from "./pages/Dashboard.page"
import ActivitiesPage from "./pages/Activites.page"
import SettingsPage from "./pages/Settings.page"
import LoginPage from "./pages/Login.page"
import RegisterPage from "./pages/Register.page"
import { Outlet } from "react-router-dom"
import { NavLink as NavLinkRouter } from "react-router-dom"
import { Notifications } from "@mantine/notifications"
import { AuthProvider, useAuthContext } from "./contexts/auth-context"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useEffect } from "react"

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
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
])

const queryClient = new QueryClient()

function Layout() {
  const [opened, { toggle }] = useDisclosure()
  const navigate = useNavigate()

  const { user, isLoading, isError } = useAuthContext()

  useEffect(() => {
    // if (isError && !["/login", "/register"].includes(location.pathname)) {
    if (isError) {
      navigate("/login")
    }
  }, [isError])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <></>
  }

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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider> <Notifications />
        </AuthProvider>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App
