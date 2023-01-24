import { useAuth, UserWithSettings } from "./auth-context"
import React, { createContext, PropsWithChildren, useContext } from "react"

const UserContext = createContext<{ user: UserWithSettings }>()

const UserProvider: React.FC<PropsWithChildren> = (props) => {
  const { user } = useAuth()

  return <UserContext.Provider value={{ user }} {...props} />
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser }
