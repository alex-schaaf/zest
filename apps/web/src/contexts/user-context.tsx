import { Settings, Users } from "@prisma/client"
import { createContext, useContext } from "react"
import { UsersWithSettings } from "./auth-context"

export const UserContext = createContext<
  { user: UsersWithSettings } | undefined
>(undefined)

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser context must be used within a UserProvider")
  }
  return context
}

export { useUser }
