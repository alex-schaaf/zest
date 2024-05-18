import axios from "@/lib/axios"
import { useState } from "react"

type RegisterContextType = {
  register: (email: string, password: string) => Promise<void>
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  error: any
}

const useRegister = (): RegisterContextType => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<any>()

  const register = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    setIsError(false)
    setIsSuccess(false)

    try {
      await axios.post("/auth/register", { email, password })
      setIsSuccess(true)
    } catch (err: any) {
      setError(err)
      setIsError(true)
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return { register, isLoading, isError, isSuccess, error }
}

export default useRegister
