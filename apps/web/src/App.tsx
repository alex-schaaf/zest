import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import "./App.css"

import { AppShell, Box } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom"
import DashboardPage from "@/pages/Dashboard.page"
import CalendarPage from "@/pages/Calendar.page"
import SettingsPage from "@/pages/Settings.page"
import LoginPage from "@/pages/Login.page"
import RegisterPage from "@/pages/Register.page"
import { Outlet } from "react-router-dom"
import { Notifications } from "@mantine/notifications"
import { AuthProvider, useAuthContext } from "./contexts/auth-context"
import { useEffect, useState } from "react"
import { UserContext } from "@/contexts/user-context"
import StravaOAuthPage from "@/pages/StravaOAuth.page"
import Navbar from "@/Navbar"
import Header from "@/Header"
import ActivitiesPage from "@/pages/Activities.page"
import ActivityPage from "./pages/Activity.page"

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
        path: "/calendar",
        Component: CalendarPage,
      },
      {
        path: "/activities",
        children: [
          {
            index: true,
            Component: ActivitiesPage,
          },
          {
            path: "/activities/:activityId",
            Component: ActivityPage,
          },
        ],
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

function Layout() {
  const [opened, { toggle }] = useDisclosure()
  const navigate = useNavigate()

  const { user, isLoading, isError, error } = useAuthContext()

  useEffect(() => {
    if (isError) {
      //  && !["/login", "/register"].includes(location.pathname)
      console.debug(error)
      navigate("/login")
    }
  }, [isError])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <>Something went wrong: no user</>
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
          <Header opened={opened} toggle={toggle} />
        </AppShell.Header>
        <AppShell.Navbar p="xs">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Box p="md">
            <Outlet />
          </Box>
        </AppShell.Main>
      </AppShell>
    </UserContext.Provider>
  )
}

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider> <Notifications />
    </AuthProvider>
  )
}

export default App
