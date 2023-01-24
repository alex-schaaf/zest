// import { lazy } from "react";
import AuthenticatedApp from "./AuthenticatedApp"
import UnauthenticatedApp from "./UnauthenticatedApp"
import { useUser } from "./contexts/user-context"

// const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { user } = useUser()

  return !user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
