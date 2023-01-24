import classNames from "classnames"
import React, { PropsWithChildren } from "react"

const Card: React.FC<PropsWithChildren & { className?: string }> = (props) => {
  return (
    <div
      className={classNames(
        "rounded-md border border-gray-200 bg-white p-4 shadow-sm",
        props.className
      )}
    >
      {props.children}
    </div>
  )
}

export default Card
