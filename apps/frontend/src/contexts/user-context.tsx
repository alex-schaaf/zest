import { UserWithSettings } from "@/contexts/auth-context"
import { createContext, useContext } from "react"

export const UserContext = createContext<
  { user: UserWithSettings } | undefined
>(undefined)

const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser context must be used within a UserProvider")
  }
  return context
}

export { useUser }
