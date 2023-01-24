import React from "react"
import Card from "../Card"

const SignIn: React.FC = () => {
  return (
    <div className="mt-24 space-y-8">
      <div className="text-center text-8xl">👟</div>
      <div className="space-y-2 text-center">
        <div className="text-3xl font-bold">Sign in to your account</div>
        <div className=" text-sm">
          Or{" "}
          <a className="text-blue-500 hover:cursor-not-allowed">
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
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="rounded-md border px-3 py-1 shadow-sm"
            />
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="text-blue-500 hover:cursor-not-allowed">
              <a>Forgot your password?</a>
            </div>
          </div>
          <button className="rounded bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm">
            Sign in
          </button>
        </form>
      </Card>
    </div>
  )
}

export default SignIn
