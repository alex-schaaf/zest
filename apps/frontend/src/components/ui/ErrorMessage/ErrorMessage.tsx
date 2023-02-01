import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import React from "react"

interface Props {
  text: string
}

const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-danger-600">
      <ExclamationTriangleIcon className="h-6 w-6" />
      <div className="">
        <span className="mr-2 font-bold">Error:</span>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default ErrorMessage
