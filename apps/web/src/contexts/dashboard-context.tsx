import { createContext, useContext } from "react"
import { Activities } from "@prisma/client"

interface DashboardContextValues {
  activities: Activities[]
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
)

const useDashboard = () => {
  const context = useContext(DashboardContext)
  if (context === undefined) {
    throw new Error(
      "useDashboard context must be used within an DashboardProvider"
    )
  }
  return context
}

export { useDashboard, DashboardContext }
