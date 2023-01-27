// import { lazy } from "react";
import AuthenticatedApp from "@/AuthenticatedApp"
import UnauthenticatedApp from "@/UnauthenticatedApp"
import { UserContext } from "@/contexts/user-context"
import { useAuth } from "@/contexts/auth-context"

// const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { user } = useAuth()

  return user ? (
    <UserContext.Provider value={{ user }}>
      <AuthenticatedApp />
    </UserContext.Provider>
  ) : (
    <UnauthenticatedApp />
  )
}

export default App
