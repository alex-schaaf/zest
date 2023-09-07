import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./components/SignIn"
import Activities from "./pages/Activities"
import Settings from "./pages/Settings"
import Register from "./Register"
import Layout from "./Layout"
import * as Toast from "@radix-ui/react-toast"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
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
])

const App = () => {
  return (
    <Toast.Provider>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6" />
      <RouterProvider router={router} />
    </Toast.Provider>
  )
}

export default App
