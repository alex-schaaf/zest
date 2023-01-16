import classNames from "classnames";
import React from "react";
import { Link, useLocation } from "wouter";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex gap-4">
          <NavButton link={"/"} text={"🍋 zest"} />
          <NavButton link={"/settings"} text={"Settings"} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

interface NavButtonProps {
  link: string;
  text: string;
}

export const NavButton: React.FC<NavButtonProps> = ({ link, text }) => {
  const [location] = useLocation();

  const isActive = location === link;

  return (
    <Link href={link}>
      <div
        className={classNames(
          "px-3 py-2 rounded-md  hover:bg-yellow-200 hover:cursor-pointer",
          { "bg-gray-200": isActive }
        )}
      >
        <a className="font-medium">{text}</a>
      </div>
    </Link>
  );
};
