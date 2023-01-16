import classNames from "classnames";
import React from "react";
import { Link, useLocation } from "wouter";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex gap-4">
          <div className="text-3xl pt-1 mr-4">🍋</div>
          <NavButton link={"/"} text={"Dashboard"} />
          <NavButton link={"/settings"} text={"Settings"} />
        </div>
        <div className="">
          <UserCircleIcon className="h-8 w-8 text-gray-500" />
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
