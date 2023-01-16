import React from "react";
import ReactDOM from "react-dom/client";
import { QueryParamProvider } from "use-query-params";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
