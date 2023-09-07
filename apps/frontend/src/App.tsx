import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./components/SignIn"
import Activities from "./pages/Activities"
import Settings from "./pages/Settings"
import Register from "./Register"
import Layout from "./Layout"
import * as Toast from "@radix-ui/react-toast"
import Spinner from "./components/ui/Spinner/Spinner"
import StravaOAuthRedirect from "./pages/StravaOAuthRedirect"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/activities",
        Component: Activities,
      },
      {
        path: "/settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "/login",
    Component: SignIn,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/auth/strava",
    Component: StravaOAuthRedirect,
  },
])

const App = () => {
  return (
    <Toast.Provider>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6" />
      <RouterProvider
        router={router}
        fallbackElement={
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        }
      />
    </Toast.Provider>
  )
}

export default App
