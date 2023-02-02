// import { lazy } from "react";
import AuthenticatedApp from "@/AuthenticatedApp"
import UnauthenticatedApp from "@/UnauthenticatedApp"
import { UserContext } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"
import Loading from "@/components/ui/Spinner"

// const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { user, settings, isLoading, isError } = useAuth()

  if (isError) {
    return <UnauthenticatedApp />
  }

  if (isLoading) {
    debugger
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />
      </div>
    )
  }

  return user && settings ? (
    <UserContext.Provider value={{ user, settings }}>
      <AuthenticatedApp />
    </UserContext.Provider>
  ) : (
    <UnauthenticatedApp />
  )
}

export default App
