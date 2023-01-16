import React from "react";
import { Link, useLocation } from "wouter";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <div className="flex gap-6">
          <NavButton link={"/"} text={"🍋 zest"} />
          <NavButton link={"/settings"} text={"Settings"} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

export const NavButton = ({ link, text }) => {
  const [location] = useLocation();

  const isActive = location === link;

  return (
    <Link href={link}>
      <div className="font-medium px-3 py-2 rounded-md bg-gray-200 hover:bg-yellow-200 hover:cursor-pointer">
        <a>{text}</a>
      </div>
    </Link>
  );
};
