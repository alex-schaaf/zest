import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import React, { PropsWithChildren } from "react"

interface Props {
  text: string
}

const ErrorMessage: React.FC<Props> = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-4 text-sm text-red-600">
      <ExclamationTriangleIcon className="h-6 w-6" />
      <div>
        <span className="font-bold">Error:</span> {text}
      </div>
    </div>
  )
}

export default ErrorMessage
