import React from "react"
import classNames from "classnames"

type Props = Omit<React.ComponentProps<"button">, "className"> & {
  intent?: "primary" | "secondary" | "danger" | "success"
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, intent, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={classNames(
        "flex items-center justify-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-sm font-medium transition-colors",
        {
          "bg-primary-500 text-white hover:bg-primary-600":
            intent === "primary",
          "bg-gray-100 hover:bg-gray-200": intent === "secondary" || !intent,
          "bg-red-500 text-white hover:bg-red-600": intent === "danger",
          "bg-emerald-500 text-white hover:bg-emerald-600":
            intent === "success",
        }
      )}
    >
      {children}
    </button>
  )
)

Button.displayName = "Button"

export default Button
