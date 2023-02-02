import { lazy, Suspense } from "react"

import UnauthenticatedApp from "@/UnauthenticatedApp"
import { UserContext } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"
import Spinner from "./components/ui/Spinner"

const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"))

const App = () => {
  const { user, settings, isLoading, isError } = useAuth()

  if (isError) {
    return <UnauthenticatedApp />
  }

  if (isLoading) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    )
  }

  return user && settings ? (
    <Suspense
      fallback={
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      }
    >
      <UserContext.Provider value={{ user, settings }}>
        <AuthenticatedApp />
      </UserContext.Provider>
    </Suspense>
  ) : (
    <UnauthenticatedApp />
  )
}

export default App
