import React, { PropsWithChildren, ReactNode } from "react";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="shadow border p-4 rounded-xl flex flex-col gap-1">
      {children}
    </div>
  );
};

const Title: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-sm text-gray-500">{props.children}</div>;
};

const Subtitle: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-sm text-gray-400">{props.children}</div>;
};

const Value: React.FC<PropsWithChildren> = (props) => {
  return <div className="text-2xl font-bold">{props.children}</div>;
};

interface StatProps {
  Title: React.FC<PropsWithChildren>;
  Subtitle: React.FC<PropsWithChildren>;
  Value: React.FC<PropsWithChildren>;
}

export const Stat: React.FC<PropsWithChildren> & StatProps = (props) => {
  return <Card>{props.children}</Card>;
};

Stat.Title = Title;
Stat.Subtitle = Subtitle;
Stat.Value = Value;

export default Stat;
