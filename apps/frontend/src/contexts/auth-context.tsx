import Loading from "../components/Loading"
import { Users, Settings } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { createContext, PropsWithChildren, useContext } from "react"

type AuthContextType = {
  user: UserWithSettings
}

const AuthContext = createContext<AuthContextType>()

export type UserWithSettings = Users & { settings: Settings }

const apiUrl = "http://localhost:3000"

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<UserWithSettings, Error>({
    queryKey: ["user"],
    queryFn: () => axios.get(apiUrl + "/users/1").then((res) => res.data),
  })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <div>error</div>
  }

  const login = () => {}
  const register = () => {}
  const logout = () => {}

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register }}
      {...props}
    />
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
