import * as Toast from "@radix-ui/react-toast"
import classNames from "classnames"
import React from "react"

interface Props {
  open: boolean
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  message: string
  intent?: "success" | "failure"
}

const ToastMessage: React.FC<Props> = (props) => {
  return (
    <Toast.Root
      open={props.open}
      onOpenChange={props.onOpenChange}
      className="rounded-md border bg-white p-4 shadow-lg"
    >
      <Toast.Title
        className={classNames("font-semibold", {
          "text-green-600": props.intent === "success",
          "text-red-600": props.intent === "failure",
        })}
      >
        {props.title}
      </Toast.Title>
      <Toast.Description className="text-sm">{props.message}</Toast.Description>
    </Toast.Root>
  )
}

export default ToastMessage
