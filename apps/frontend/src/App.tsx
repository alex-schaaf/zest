import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SettingsPage from "./pages/SettingsPage";
import StravaOAuthRedirect from "./pages/StravaOAuthRedirect";
import useSWR from "swr";
import { Users, Settings } from "@prisma/client";
import UserContext from "./contexts/UserContext/UserContext";
import Loading from "./components/Loading";

const apiUrl = "http://localhost:3000";

export type UserWithSettings = Users & { settings: Settings };

const App = () => {
  const {
    isLoading,
    data: user,
    error,
  } = useSWR<UserWithSettings, Error>(apiUrl + "/users/1");

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error?.message}</div>;
  }

  return (
    <div>
      <UserContext.Provider
        value={{ user } as unknown as { user: UserWithSettings }}
      >
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
      </UserContext.Provider>
    </div>
  );
};

export default App;
