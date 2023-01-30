import Navbar from "@/components/Navbar"
import Dashboard from "@/pages/Dashboard.page"
import Settings from "@/pages/Settings.page"
import StravaOAuthRedirect from "@/pages/StravaOAuthRedirect.page"
import * as Toast from "@radix-ui/react-toast"
import { Route } from "wouter"
import Activities from "@/pages/Activities.page"

const AuthenticatedApp = () => {
  return (
    <Toast.Provider>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[100000] m-0 flex w-[390px] flex-col p-6" />
      <Navbar />
      <main className="p-6">
        <Route path="/">
          <Dashboard />
        </Route>
        <Route path="/activities">
          <Activities />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/auth/strava">
          <StravaOAuthRedirect />
        </Route>
      </main>
    </Toast.Provider>
  )
}

export default AuthenticatedApp
