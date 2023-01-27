import Navbar from "@/components/Navbar"
import Home from "@/pages/Home"
import SettingsPage from "@/pages/SettingsPage"
import StravaOAuthRedirect from "@/pages/StravaOAuthRedirect"
import * as Toast from "@radix-ui/react-toast"
import { Route } from "wouter"

const AuthenticatedApp = () => {
  return (
    <Toast.Provider>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6" />
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
    </Toast.Provider>
  )
}

export default AuthenticatedApp
