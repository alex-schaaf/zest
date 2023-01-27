import { useAuth, UserWithSettings } from "./auth-context"
import React, { createContext, PropsWithChildren, useContext } from "react"

export const UserContext = createContext<{ user: UserWithSettings }>()

const useUser = () => useContext(UserContext)

export { useUser }
