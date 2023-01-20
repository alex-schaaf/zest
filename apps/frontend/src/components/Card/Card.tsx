import React, { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="border rounded-md shadow-sm p-4 border-gray-300">
      {props.children}
    </div>
  );
};

export default Card;
