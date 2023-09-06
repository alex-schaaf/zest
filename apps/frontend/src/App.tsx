import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import SignIn from "./components/SignIn"
import { useAuth } from "./contexts/auth-context"
import Activities from "./pages/Activities"
import Settings from "./pages/Settings"
import Register from "./Register"
import Spinner from "./components/ui/Spinner/Spinner"
import { UserContext } from "./contexts/user-context"
import Navbar from "./components/Navbar"

const App = () => {
  const { user, settings, isLoading, isError } = useAuth()

  let location = useLocation()
  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )
  }

  if (isError) {
    if (!["/login", "/register"].includes(location.pathname)) {
      navigate("/login")
    }
  }

  return user && settings ? (
    <UserContext.Provider value={{ user, settings }}>
      <Navbar />
      <Routes>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route path="activities" element={<Activities />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </UserContext.Provider>
  ) : (
    <Routes>
      <Route path="login" element={<SignIn />} />
      <Route path="register" element={<Register />} />
    </Routes>
  )
}

export default App
