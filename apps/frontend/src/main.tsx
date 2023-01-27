import App from "./App"
import { AuthProvider } from "@/contexts/auth-context"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import React from "react"
import ReactDOM from "react-dom/client"

const queryClient = new QueryClient()

dayjs.extend(isoWeek)

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
