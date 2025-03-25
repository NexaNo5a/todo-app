import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {UserCircleIcon} from "@heroicons/react/16/solid";

export default function UserMenu({ username, onSettings, onLogout }) {
    return (
        <Menu as="div" className="relative flex h-16 shrink-0 items-center -mx-2 space-y-1">

                <MenuButton className="group flex w-full items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                    <UserCircleIcon className="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" />
                    <span>{username}</span>
                    <ChevronDownIcon className="size-4 text-indigo-200 group-hover:text-white" />
                </MenuButton>


            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 top-full left-0  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    <MenuItem>
                        <button
                            type='button'
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                        >
                            Account settings
                        </button>
                    </MenuItem>


                        <MenuItem>
                            <button
                                onClick={onLogout}
                                type="button"
                                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                                Sign out
                            </button>
                        </MenuItem>

                </div>
            </MenuItems>
        </Menu>
    )
}
