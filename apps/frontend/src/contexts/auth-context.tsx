import { Users, Settings } from "@prisma/client"
import axios from "@/lib/axios"
import { createContext, PropsWithChildren, useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

type AuthContextType = {
  user?: Users
  settings?: Settings
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoading: boolean
  isError: boolean
  error: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export type UserWithSettings = Users & { settings: Settings }

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient()

  const [error, setError] = useState(null)

  const {
    data: user,
    isLoading: isLoadingUser,
    isError,
  } = useQuery<Users>({
    queryKey: ["user"],
    queryFn: () => axios.get("/users").then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const { data: settings } = useQuery<Settings>({
    queryKey: ["settings"],
    enabled: !!user,
    refetchOnWindowFocus: false,
    queryFn: () =>
      axios
        .get(`/users/${user?.id}/settings/${user?.settingsId}`)
        .then((res) => res.data),
  })

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const { userId, iat, exp } = await axios
        .post("/auth/login", { email, password })
        .then((res) => res.data)

      localStorage.setItem("userId", userId)
      localStorage.setItem("iat", iat)
      localStorage.setItem("exp", exp)

      await queryClient.fetchQuery<Users>({
        queryKey: ["user"],
        queryFn: () => axios.get(`/users/${userId}`).then((res) => res.data),
      })
    } catch (err: any) {
      setError(err)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }


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
        settings,
        login,
        logout,
        isLoading: !isError && isLoading,
        isError,
        error,
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
