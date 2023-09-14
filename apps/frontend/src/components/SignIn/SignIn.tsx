import Card from "@/components/ui/Card"
import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import Button from "../ui/Button"
import { EnterIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router-dom"
import Message from "../ui/Message"

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { login, isLoading, error } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) return
    await login(email, password)
    navigate("/dashboard")
  }

  return (
    <div className="mt-24 space-y-8 mx-auto w-96">
      <div className="text-center text-8xl">🍋</div>
      <div className="space-y-2 text-center">
        <div className="text-3xl font-bold">Sign in to your account</div>
        <div className=" text-sm">
          Or{" "}
          <a href="/register" className="text-primary-500">
            register your new account
          </a>
        </div>
      </div>
      <Card>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-500"
            >
              Email address
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="rounded-md border px-3 py-1 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="rounded-md border px-3 py-1 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="flex justify-center text-sm text-gray-700">
            <div className="text-primary-500 hover:cursor-not-allowed">
              <a>Forgot your password?</a>
            </div>
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            disabled={!email || !password}
            intent="primary"
            name="signIn"
          >
            {isLoading ? (
              "loading"
            ) : (
              <>
                <EnterIcon /> Sign in
              </>
            )}
          </Button>
        </form>
        {error && (
          <div className="mt-4 bg-danger-50 p-4">
            <Message text={"Invalid credentials"} intent="error" />
          </div>
        )}
      </Card>
    </div>
  )
}

export default SignIn
