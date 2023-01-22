import React from "react";
import Card from "../Card";

const SignIn: React.FC = () => {
  return (
    <div className="space-y-8 mt-24">
      <div className="text-8xl text-center">👟</div>
      <div className="text-center space-y-2">
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
            <label className="font-medium text-sm text-gray-500">
              Email address
            </label>
            <input
              type="text"
              className="px-3 py-1 border shadow-sm rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="px-3 py-1 border shadow-sm rounded-md"
            />
          </div>
          <div className="text-sm text-gray-700 flex justify-between">
            <div className="flex gap-2">
              <input type="checkbox" />
              <label>Remember me</label>
            </div>
            <div className="text-blue-500 hover:cursor-not-allowed">
              <a>Forgot your password?</a>
            </div>
          </div>
          <button className="bg-blue-600 text-white rounded shadow-sm px-3 py-2 text-sm font-medium">
            Sign in
          </button>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
