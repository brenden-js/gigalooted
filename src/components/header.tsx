import {Building21Nav} from "./building-21-nav";
import React from "react";
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'

const navigation = [
  {name: 'Gear', href: '/', external: false, priority: false},
  {name: 'Keys', href: '/keys', external: false, priority: true},
  {name: 'Stash', href: '/stash', external: false, priority: false},
  {name: 'Current Objectives', href: '/objectives', external: false, priority: true},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function NavItem({href, external, name}: { href: string, external: boolean, name: string }) {
  const isActive = useRouter().pathname === href

  if (external) {
    return (
      <a
        rel="noopener noreferrer"
        target="_blank"
        key={name}
        href={href}
        className={classNames(
          isActive
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
          'px-3 py-2 rounded-md text-sm font-heading'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {name}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={classNames(
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        'px-3 py-2 rounded-md text-sm font-heading'
      )}
    >
      {name}
    </Link>
  )
}

export const Header = () => {
  return (
    <Disclosure as="nav" className="bg-black border-b border-gray-700">
      {({open}) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 py-2 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link
                    href={'/'}
                  >
                    <Image
                      width={64}
                      height={64}
                      src="/logo.png"
                      alt="gigalooted.com logo"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => <NavItem key={item.href} href={item.href} external={item.external}
                                                       name={item.name} />)}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="relative mr-6">
                    <Building21Nav />
                  </div>
                </div>
              </div>

              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <div className="flex items-baseline space-x-4 mr-12">
                  {navigation.filter((item) => item.priority).map((item) => <NavItem key={item.href}
                                                                                     href={item.href}
                                                                                     external={item.external}
                                                                                     name={item.name} />)}
                </div>
                <Disclosure.Button
                  className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-700 py-4">
              <div className="flex items-center px-5 justify-center">
                <Building21Nav />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header;
