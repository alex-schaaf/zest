import React from "react";
import { Route } from "wouter";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import StravaOAuthRedirect from "./pages/StravaOAuthRedirect";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="p-6">
        <Route path="/">
          <Home />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/auth/strava">
          <StravaOAuthRedirect />
        </Route>
      </main>
    </>
  );
};

export default App;
