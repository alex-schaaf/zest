// import { lazy } from "react";
import AuthenticatedApp from "@/AuthenticatedApp"
import UnauthenticatedApp from "@/UnauthenticatedApp"
import { UserContext } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"
import Loading from "./components/Loading"
import Card from "./components/Card"

// const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { user, isLoading, isError } = useAuth()

  if (isError) {
    return <UnauthenticatedApp />
  }

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    )
  }

  return user ? (
    <UserContext.Provider value={{ user }}>
      <AuthenticatedApp />
    </UserContext.Provider>
  ) : (
    <UnauthenticatedApp />
  )
}

export default App
