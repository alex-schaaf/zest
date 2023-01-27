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

type AuthContextType = {
  user?: UserWithSettings
  login: (email: string, password: string) => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export type UserWithSettings = Users & { settings: Settings }

const AuthProvider: React.FC<PropsWithChildren> = (props) => {
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState<UserWithSettings>()

  useEffect(() => {
    if (user !== undefined) return

    const getUserWithCookieToken = async () => {
      const user = await axios.get("/users").then((res) => res.data)
      if (!user) return
      setUser(user)
    }

    getUserWithCookieToken()
  }, [user])

  if (isLoading) {
    return <Loading />
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { userId, iat, exp } = await axios
        .post("/auth/login", { email, password })
        .then((res) => res.data)

      localStorage.setItem("userId", userId)
      localStorage.setItem("iat", iat)
      localStorage.setItem("exp", exp)

      const user = await axios
        .get<UserWithSettings>(`/users/${userId}`)
        .then((res) => res.data)

      setUser(user)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const register = () => {}
  const logout = () => {}

  return <AuthContext.Provider value={{ user, login, isLoading }} {...props} />
}

const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth context must be used within an AuthProvider")
  }
  return context
}

export { AuthProvider, useAuth }
