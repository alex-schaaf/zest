import useStravaSync from "../../hooks/useStravaSync"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import * as Avatar from "@radix-ui/react-avatar"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import classNames from "classnames"
import React, { useState, useEffect } from "react"
import { Link, useLocation } from "wouter"
import ToastMessage from "../ToastMessage/ToastMessage"

const Navbar: React.FC = () => {
  const [location] = useLocation()
  const [openError, setOpenError] = useState(false)
  const [openSuccess, setOpenSuccess] = useState(false)

  const { isLoading, isError, isSuccess, canSync, sync } = useStravaSync()

  useEffect(() => {
    setOpenError(isError)
  }, [isError])

  useEffect(() => {
    if (isSuccess === null) return
    setOpenSuccess(isSuccess)
  }, [isSuccess])

  return (
    <nav className="h-[4rem] border-b bg-white">
      <div className="container mx-auto flex h-full flex-wrap content-center justify-between">
        <div className="flex content-center gap-4">
          <div className=" text-4xl">👟</div>
          <Link
            href={"/"}
            className={classNames(
              "  text-sm font-medium hover:cursor-pointer",
              { underline: location === "/" }
            )}
          >
            Dashboard
          </Link>
          <Link
            href={"/settings"}
            className={classNames(
              "  text-sm font-medium hover:cursor-pointer ",
              { underline: location === "/settings" }
            )}
          >
            Settings
          </Link>
        </div>
        <div className="flex">
          <ToastMessage intent={"failure"} open={openError} onOpenChange={setOpenError} title={"Error"} message={"Failed to sync activites with Strava."} />
          <ToastMessage intent={"success"} open={openSuccess} onOpenChange={setOpenSuccess} title={"Success"} message={"Successfully synced new activities with Strava."} />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button>
                <Avatar.Root>
                  <Avatar.Fallback className="text-md flex h-[2.5rem] w-[2.5rem] justify-center rounded-full bg-blue-200 p-2 text-center font-medium text-blue-800">
                    {isLoading ? (
                      <ArrowPathIcon className="h-6 w-6 animate-spin text-blue-600" />
                    ) : (
                      "AS"
                    )}
                  </Avatar.Fallback>
                </Avatar.Root>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content className="min-w-[200px] rounded-md border bg-white p-1 text-sm shadow-xl ">
                <DropdownMenu.Item
                  className="rounded px-2 py-1 hover:cursor-pointer hover:bg-blue-500 hover:text-white"
                  disabled={canSync}
                  onClick={async () => {
                    await sync()
                  }}
                >
                  Sync Activities
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="my-1 h-[1px] bg-gray-200" />
                <DropdownMenu.Item className="rounded px-2 py-1 hover:cursor-pointer hover:bg-blue-500 hover:text-white">
                  Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
