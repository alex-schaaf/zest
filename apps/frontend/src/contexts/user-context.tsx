import { Settings, Users } from "@prisma/client"
import { createContext, useContext } from "react"

export const UserContext = createContext<
  { user: Users; settings: Settings } | undefined
>(undefined)

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser context must be used within a UserProvider")
  }
  return context
}

export { useUser }
