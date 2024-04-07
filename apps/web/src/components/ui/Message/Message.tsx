import { ExclamationTriangleIcon, RocketIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import React from "react"

interface Props {
  text: string
  intent: "success" | "error"
}

const Message: React.FC<Props> = ({ text, intent }) => {
  const iconClassName = "h-6 w-6"

  return (
    <div
      className={classNames("flex items-center justify-center gap-2 text-sm", {
        "text-danger-600": intent === "error",
        "text-success-600": intent === "success",
      })}
    >
      {intent === "error" && (
        <ExclamationTriangleIcon className={iconClassName} />
      )}
      {intent === "success" && <RocketIcon className={iconClassName} />}
      <div>
        <span className="mr-2 font-bold">
          {intent === "error" && "Error:"}
          {intent === "success" && "Success:"}
        </span>
        <span>{text}</span>
      </div>
    </div>
  )
}

export default Message
