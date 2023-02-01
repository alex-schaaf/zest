import React from "react"
import classNames from "classnames"
import { ReloadIcon } from "@radix-ui/react-icons"

type Props = Omit<React.ComponentProps<"button">, "className"> & {
  intent?: "primary" | "secondary" | "danger" | "success"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, intent, isLoading, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "relative flex items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400",
        {
          "bg-primary-500 text-white hover:bg-primary-600":
            intent === "primary",
          "bg-gray-100 hover:bg-gray-200": intent === "secondary" || !intent,
          "bg-danger-500 text-white hover:bg-danger-600": intent === "danger",
          "bg-emerald-500 text-white hover:bg-emerald-600":
            intent === "success",
        }
      )}
    >
      <span
        className={classNames("flex items-center gap-2", {
          invisible: isLoading,
        })}
      >
        {children}
      </span>
      {isLoading && (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ReloadIcon className="animate-spin" />
        </div>
      )}
    </button>
  )
)

Button.displayName = "Button"

export default Button
