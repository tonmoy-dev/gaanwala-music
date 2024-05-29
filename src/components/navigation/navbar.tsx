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
import { ModeToggle } from "../theme/toggle-theme";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  // take data (session active or not) from session
  const { data: session } = useSession();
  // take user data from session
  const user: User = session?.user as User; // added assertion type here

  return (
    <Disclosure as="nav" className="shadow bg-white dark:bg-gray-900">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center px-2 lg:px-0 gap-10">
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
                {session ? <span>Welcome, {user?.username}</span> : ""}
              </div>
              {/* --- Small screen menu --- */}
              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                <div className="flex items-center gap-2">
                  <ModeToggle />
                  {session ? (
                    <>
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative flex-shrink-0">
                        {({ open }) => (
                          <>
                            <div>
                              <MenuButton className="flex rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
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
                                  className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-zinc-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                >
                                  <MenuItem>
                                    {({ focus }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          focus ? "bg-zinc-800" : "",
                                          "block px-4 py-2 text-sm"
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
                                          focus ? "bg-zinc-800" : "",
                                          "block px-4 py-2 text-sm "
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
                                          focus ? "bg-zinc-800" : "",
                                          "block px-4 py-2 text-sm"
                                        )}
                                        onClick={() => signOut()}
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
                    </>
                  ) : (
                    <>
                      <Link href={"/sign-in"}>
                        <Button variant="ghost" className="px-3">
                          <UserIcon className="me-1" />
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
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
                    <div className="text-sm font-medium text-zinc-400">
                      tom@example.com
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    Your Profile
                  </DisclosureButton>
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
                  >
                    Dashboard
                  </DisclosureButton>
                  <DisclosureButton
                    as="a"
                    href="#"
                    className="block rounded-md px-3 py-2 text-base font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white"
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
