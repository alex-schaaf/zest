import React from "react";

type Props = Omit<React.ComponentProps<"button">, "className"> & {};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className="group inline-flex select-none items-center justify-center gap-1 rounded-md bg-gray-100 px-4 py-2 text-sm font-medium"
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
