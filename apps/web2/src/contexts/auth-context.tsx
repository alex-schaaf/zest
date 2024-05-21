import { UserWithSettings } from "@/types/user.types"
import axios from "@/lib/axios"
import { createContext, PropsWithChildren, useContext } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

type AuthContextType = {
  user?: UserWithSettings
  logout: () => Promise<void>
  isLoading: boolean
  isError: boolean
  error: any
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery<UserWithSettings>({
    queryKey: ["user"],
    queryFn: () => axios.get("/users/from-cookie").then((res) => res.data),
    refetchOnWindowFocus: false,
    retry: 0,
  })

  const logout = async () => {
    try {
      await axios.delete("/auth/logout")
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
        logout,
        isLoading: !isError && isLoading,
        isError,
        error,
      }}
      {...props}
    />
  )
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth context must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuthContext }
