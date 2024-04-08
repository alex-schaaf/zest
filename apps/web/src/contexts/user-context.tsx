import { UsersWithSettings } from "@/types/user.types"
import { createContext, useContext } from "react"

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
