import useStravaSync from "@/hooks/useStravaSync"
import ToastMessage from "@/components/ui/ToastMessage"
import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import classNames from "classnames"
import React, { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { PersonIcon, ReloadIcon } from "@radix-ui/react-icons"
import { useAuth } from "@/contexts/auth-context"

const dropdownItemStyles =
  "rounded px-2 py-1 hover:cursor-pointer hover:bg-primary-500 hover:text-white"

export const pages = [
  {
    href: "/dashboard",
    text: "Dashboard",
  },
  {
    href: "/activities",
    text: "Activities",
  },
  {
    href: "/settings",
    text: "Settings",
  },
]

const Navbar: React.FC = () => {
  const [openError, setOpenError] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  const { isLoading, isError, isSuccess, canSync, sync } = useStravaSync()
  const { logout } = useAuth()

  useEffect(() => {
    setOpenError(isError)
  }, [isError])

  useEffect(() => {
    if (isSuccess === null) return
    setOpenSuccess(isSuccess)
  }, [isSuccess])

  return (
    <div className="h-[4rem] border-b bg-white px-6">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="text-4xl">🍋</div>
        <nav className="flex content-center gap-4 text-base font-medium text-gray-500">
          {pages.map((page, idx) => (
            <NavLink
              key={idx}
              to={page.href}
              className={({ isActive }) =>
                classNames("", { "text-primary-600": isActive })
              }
            >
              {page.text}
            </NavLink>
          ))}
        </nav>
        <div className="flex">
          <ToastMessage
            intent={"failure"}
            open={openError}
            onOpenChange={setOpenError}
            title={"Error"}
            message={"Failed to sync activites with Strava."}
          />
          <ToastMessage
            intent={"success"}
            open={openSuccess}
            onOpenChange={setOpenSuccess}
            title={"Success"}
            message={"Successfully synced new activities with Strava."}
          />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button>
                <Avatar.Root>
                  <Avatar.Fallback className="text-md flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full bg-primary-200 p-2 text-center font-medium text-primary-800">
                    {isLoading ? (
                      <ReloadIcon className="h-5 w-5 animate-spin text-primary-500" />
                    ) : (
                      <PersonIcon className="h-5 w-5 text-primary-500" />
                    )}
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="mr-1 min-w-[200px] rounded-md border bg-white p-1 text-sm shadow-xl">
                <DropdownMenu.Item
                  className={classNames(dropdownItemStyles, {
                    "text-gray-300": !canSync,
                  })}
                  disabled={!canSync}
                  onClick={async () => {
                    await sync()
                  }}
                >
                  Sync Activities
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-[1px] bg-gray-200" />
                <DropdownMenu.Item
                  className={dropdownItemStyles}
                  onClick={async () => {
                    await logout()
                  }}
                >
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  )
}

export default Navbar
