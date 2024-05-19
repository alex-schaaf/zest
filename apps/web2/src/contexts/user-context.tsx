import { UserWithSettings } from "@/types/user.types"
import { createContext, useContext } from "react"

interface UserContextType {
  user: UserWithSettings
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const useUserContext = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within an UserProvider")
  }
  return context
}

export { useUserContext, UserContext }
