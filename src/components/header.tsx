import {Building21Nav} from "./building-21-nav";
import React, {useContext, useEffect, useState} from "react";
import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from "next/image"
import Link from "next/link"
import {useRouter} from 'next/router'
import {LootContext} from "../contexts/loot-list";

const navigation = [
  {name: 'Gear', href: '/', external: false, priority: false},
  {name: 'Keys', href: '/keys', external: false, priority: true},
  {name: 'Stash', href: '/stash', external: false, priority: false},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function NavItem({href, external, name, currentObjectivesCount, displayCount}: {
  href: string,
  external: boolean,
  name: string,
  currentObjectivesCount?: number
  displayCount?: boolean
}) {
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
      {displayCount && currentObjectivesCount !== 0 &&
        <span className="ml-2 text-sm font-medium text-gray-400">({currentObjectivesCount})</span>}
      {displayCount && !currentObjectivesCount &&
        <span className="ml-2 text-sm font-medium text-gray-400">(0)</span>}
    </Link>
  )
}

export const Header = () => {
  const loot = useContext(LootContext);

  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    let total = 0;
    total += loot.items.length;
    total += loot.keys.length;
    total += loot.stash.length;
    setItemCount(total);
  }, [loot.items, loot.keys, loot.stash]);
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
                    <NavItem href="/objectives" external={false} name="Current Objectives"
                             displayCount currentObjectivesCount={itemCount} />
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
