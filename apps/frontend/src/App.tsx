// import { lazy } from "react";
import { useUser } from "./contexts/user-context";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

// const AuthenticatedApp = lazy(() => import("./AuthenticatedApp"));
// const UnauthenticatedApp = lazy(() => import("./UnauthenticatedApp"));

const App = () => {
  const { user } = useUser();

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />;
};

export default App;
