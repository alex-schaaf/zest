import Loading from "@/components/Loading"
import { Users, Settings } from "@prisma/client"
import axios from "@/lib/axios"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

type AuthContextType = {
  user?: UserWithSettings
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isError: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export type UserWithSettings = Users & { settings: Settings }

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading: isLoadingUser,
    isError,
  } = useQuery<UserWithSettings>({
    queryKey: ["user"],
    queryFn: () => axios.get("/users").then((res) => res.data),
    retry: 0,
  })

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { userId, iat, exp } = await axios
        .post("/auth/login", { email, password })
        .then((res) => res.data)

      localStorage.setItem("userId", userId)
      localStorage.setItem("iat", iat)
      localStorage.setItem("exp", exp)

      await queryClient.fetchQuery<UserWithSettings>({
        queryKey: ["user"],
        queryFn: () => axios.get(`/users/${userId}`).then((res) => res.data),
      })
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const register = () => {}

  const logout = async () => {
    try {
      await axios.post("/auth/logout")
      queryClient.invalidateQueries({ queryKey: ["user"] })
      queryClient.setQueryData(["user"], undefined)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading: !isError && (isLoading || isLoadingUser),
        isError,
      }}
      {...props}
    />
  )
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth context must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
