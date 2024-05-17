"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MenuIcon, Search as SearchIcon, UserIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0">
                <div className="flex-shrink-0">
                  {/* --- Logo --- */}
                  <div className="flex items-center justify-center">
                    <Image
                      className="block h-10 w-auto lg:hidden"
                      src="/logo.png"
                      width={50}
                      height={50}
                      alt="Your Company"
                    />
                    <Image
                      className="hidden h-10 w-auto lg:block"
                      src="/logo.png"
                      width={50}
                      height={50}
                      alt="Your Company"
                    />
                    <Link className="text-base" href={"/"}>
                      Gaanwala Music
                    </Link>
                  </div>
                </div>
                {/* --- Large screen navigation --- */}
                {/* <div className="hidden lg:ml-6 lg:block">
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    >
                      Home
                    </a>
                  </div>
                </div> */}
              </div>
              {/* --- Large screen search & profile menu --- */}
              <div className="flex flex-1 w-full px-2 hidden lg:block ml-6">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search Songs
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                      placeholder="Search Songs"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              {/* --- Small screen menu --- */}
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              {/* --- Large screen profile menu --- */}
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <Link href={"/login"} className="flex items-center gap-2">
                    <UserIcon />
                    <span>Login</span>
                  </Link>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    {({ open }) => (
                      <>
                        <div>
                          <MenuButton className="flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <Image
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              width={256}
                              height={256}
                              alt=""
                            />
                          </MenuButton>
                        </div>
                        <AnimatePresence>
                          {open && (
                            <MenuItems
                              static
                              as={motion.div}
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              anchor="bottom end"
                              className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      focus ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      focus ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Dashboard
                                  </a>
                                )}
                              </MenuItem>
                              <MenuItem>
                                {({ focus }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      focus ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Logout
                                  </a>
                                )}
                              </MenuItem>
                            </MenuItems>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          {/* --- Small screen navigation --- */}
          <AnimatePresence>
            <DisclosurePanel
              static={false}
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              // anchor="bottom"
              className="lg:hidden"
            >
              {/* <div className="space-y-1 px-2 pt-2 pb-3">
                <DisclosureButton
                  as="a"
                  href="#"
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Home
                </DisclosureButton>
              </div> */}
              {/* --- Search Songs --- */}
              <div className="flex flex-1 justify-center px-6 py-4 lg:hidden">
                <div className="w-full max-w-lg lg:max-w-xs">
                  <label htmlFor="search" className="sr-only">
                    Search Songs
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-transparent bg-gray-700 py-2 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-sm"
                      placeholder="Search Songs"
                      type="search"
                    />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4 pb-3">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      width={256}
                      height={256}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Your Profile
                  </DisclosureButton>
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Dashboard
                  </DisclosureButton>
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                  >
                    Logout
                  </DisclosureButton>
                </div>
              </div>
            </DisclosurePanel>
          </AnimatePresence>
        </>
      )}
    </Disclosure>
  );
}
