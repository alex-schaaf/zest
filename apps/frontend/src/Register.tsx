import { useState } from "react"
import { Pencil2Icon } from "@radix-ui/react-icons"
import Card from "./components/ui/Card"

import Button from "./components/ui/Button"
import useRegister from "./hooks/useRegister"
import Message from "./components/ui/Message"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const { register, isLoading, error, isSuccess } = useRegister()

  const handleSubmit = async () => {
    if (!email || !password) return
    await register(email, password)
    setEmail("")
    setPassword("")
    setPasswordConfirm("")
  }

  return (
    <div className="mt-24 space-y-8">
      <div className="text-center text-8xl">🍋</div>
      <div className="space-y-2 text-center">
        <div className="text-3xl font-bold">Create a new account</div>
        <div className=" text-sm">
          Or{" "}
          <a href="/" className="text-primary-500">
            sign into existing account
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
          <div className="flex flex-col">
            <label
              htmlFor="passwordConfirm"
              className="text-sm font-medium text-gray-500"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="rounded-md border px-3 py-1 shadow-sm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
            />
          </div>

          <Button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
            disabled={
              !email ||
              !password ||
              !passwordConfirm ||
              password !== passwordConfirm
            }
            intent="primary"
            name="signIn"
          >
            {isLoading ? (
              "loading"
            ) : (
              <>
                <Pencil2Icon /> Register
              </>
            )}
          </Button>
        </form>

        {error && (
          <div className="mt-4 bg-danger-50 p-4">
            {error.response?.status === 400 ? (
              <Message text="Email already registered." intent="error" />
            ) : (
              <Message text="Something went wrong." intent="error" />
            )}
          </div>
        )}
        {isSuccess && (
          <div className="mt-4 bg-success-50 p-4">
            <Message text="New account created." intent="success" />
          </div>
        )}
      </Card>
    </div>
  )
}

export default Register
