import App from "./App"
import { AuthProvider } from "@/contexts/auth-context"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear"
import isLeapYear from "dayjs/plugin/isLeapYear"
import React from "react"
import ReactDOM from "react-dom/client"
import { setupWorker } from "msw"
import { handlers } from "./mocks/handlers"

const worker = setupWorker(...handlers)

async function prepare() {
  if (import.meta.env.VITE_MOCK === "mock") {
    return worker.start()
  }
}

const queryClient = new QueryClient()

dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)
dayjs.extend(isSameOrBefore)

prepare().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  )
})
