import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import StravaOAuthRedirect from "./pages/StravaOAuthRedirect";

const AuthenticatedApp = () => {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Route path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/auth/strava">
          <StravaOAuthRedirect />
        </Route>
      </main>
    </>
  );
};

export default AuthenticatedApp;
