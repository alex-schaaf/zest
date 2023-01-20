import classNames from "classnames";
import React, { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren & { className?: string }> = (props) => {
  return (
    <div
      className={classNames(
        "border rounded-md shadow-sm p-4 border-gray-200 bg-white",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default Card;
