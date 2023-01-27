import Card from "@/components/Card"
import React, { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("email@example.com")
  const [password, setPassword] = useState("admin")

  const { login, isLoading } = useAuth()

  const handleSubmit = async () => {
    if (!email || !password) return
    console.log("email", email)
    console.log("password", password)

    await login(email, password).catch((err) => console.error(err))
  }

  return (
    <div className="mt-24 space-y-8">
      <div className="text-center text-8xl">👟</div>
      <div className="space-y-2 text-center">
        <div className="text-3xl font-bold">Sign in to your account</div>
        <div className=" text-sm">
          Or{" "}
          <a className="text-primary-500 hover:cursor-not-allowed">
            register your new account
          </a>
        </div>
      </div>
      <Card>
        <form className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500">
              Email address
            </label>
            <input
              type="text"
              className="rounded-md border px-3 py-1 shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="rounded-md border px-3 py-1 shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="text-primary-500 hover:cursor-not-allowed">
              <a>Forgot your password?</a>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            className="rounded bg-primary-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
          >
            {isLoading ? "loading" : "Sign in"}
          </button>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
