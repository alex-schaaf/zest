import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./components/ui/Navbar"
import { UserContext } from "./contexts/user-context"
import { useAuth } from "./contexts/auth-context"
import Spinner from "./components/ui/Spinner/Spinner"
import { useEffect } from "react"

const Layout = () => {
  const { user, isLoading, isError } = useAuth()

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )
  }

  useEffect(() => {
    if (isError && !["/login", "/register"].includes(location.pathname)) {
      navigate("/login")
    }
  }, [isError])

  return user ? (
    <UserContext.Provider value={{ user }}>
      <header>
        <Navbar />
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </UserContext.Provider>
  ) : (
    <></>
  )
}

export default Layout
