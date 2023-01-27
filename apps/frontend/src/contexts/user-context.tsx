import { UserWithSettings } from "@/contexts/auth-context"
import { createContext, useContext } from "react"

export const UserContext = createContext<{ user: UserWithSettings }>()

const useUser = () => useContext(UserContext)

export { useUser }
