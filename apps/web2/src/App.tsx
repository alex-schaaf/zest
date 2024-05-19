import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "./App.css"

import {
  AppShell,
  Burger,
  Button,
  MantineProvider,
  NavLink,
} from "@mantine/core"
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
import { UserContext } from "./contexts/user-context"
import StravaOAuthPage from "./pages/StravaOAuth.page"
import Navbar from "./Navbar"

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
      {
        path: "/auth/strava",
        Component: StravaOAuthPage,
      },
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
    <UserContext.Provider value={{ user }}>
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
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </UserContext.Provider>
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
