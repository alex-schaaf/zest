import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./components/SignIn"
import Activities from "./pages/Activities"
import Settings from "./pages/Settings"
import Register from "./Register"
import Spinner from "./components/ui/Spinner/Spinner"
import { UserContext } from "./contexts/user-context"
import Navbar from "./components/Navbar"
import Layout from "./Layout"

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
  return <RouterProvider router={router} />
}

export default App
