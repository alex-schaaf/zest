import React from "react";
import { Route } from "wouter";
import Navbar from "./components/Navbar";
import Settings from "./routes/Settings";

const App = () => {
  return (
    <>
      <Navbar />
      <main>
        <Route path="/">home</Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </main>
    </>
  );
};

export default App;
