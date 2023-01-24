import classNames from "classnames"
import React from "react"
import { Link, useLocation } from "wouter"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import StravaSyncBtn from "../StravaSyncBtn/StravaSyncBtn"

const Navbar: React.FC = () => {
  return (
    <nav className="h-18 border-b bg-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex gap-4">
          <NavButton link={"/"} text={"Dashboard"} />
          <NavButton link={"/settings"} text={"Settings"} />
        </div>
        <div className="flex">
          <div className="text-right">
            <StravaSyncBtn />
          </div>
          <UserCircleIcon className="h-8 w-8 text-gray-400" />
        </div>
      </div>
    </nav>
  )
}

export default Navbar

interface NavButtonProps {
  link: string
  text: string
}

export const NavButton: React.FC<NavButtonProps> = ({ link, text }) => {
  const [location] = useLocation()

  const isActive = location === link

  return (
    <Link href={link}>
      <div
        className={classNames(
          "flex px-3 py-2 pt-4 text-sm font-medium hover:cursor-pointer ",
          { "border-b-4 border-yellow-200": isActive }
        )}
      >
        <a className="">{text}</a>
      </div>
    </Link>
  )
}
