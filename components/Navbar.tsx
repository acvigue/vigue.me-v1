'use client'

import Link from "next/link";
import NavWrapper from "@/components/NavWrapper";
import config from "@/config";
import Image from "next/image";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <NavWrapper>
      <div className="flex w-full max-w-6xl flex-nowrap items-center justify-between">
        <div className="flex flex-shrink-0 space-x-0 md:space-x-2">
          <div className="inline-block">
            <Link href="/" className="flex items-center justify-between rounded text-gray-900 dark:text-gray-100 ">
              <span className="flex select-none items-center justify-between pr-4 text-sm" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/*<Image width={40} height={40} src={config.headshot} className="w-8 md:w-10" alt="headshot image" />*/}
              </span>
              <span className="font-bold">{config.name}</span>
            </Link>
          </div>
        </div>
        <div className="lg:flex-1 lg:flex justify-end hidden gap-5">
          {config.nav.map(({ name, href }, i, a) => (
            <div key={name} className="my-1 flex items-center">
              <Link
                href={href}
                className="flex items-center justify-between rounded hover:text-gray-700 text-gray-900 dark:text-gray-100 dark:hover:text-gray-400 transform-gpu duration-300"
              >
                <span>{name}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1 justify-end flex lg:hidden relative">
          <FiMenu size={24} onClick={() => setNavOpen(!navOpen)} style={{ 'cursor': 'pointer' }} />
          <div className={`transform-gpu duration-150 absolute shadow-2xl drop-shadow-2xl bg-gray-200 dark:bg-gray-600 lg:hidden flex flex-col gap-[2px] dark:border-gray-600 border-gray-200 border-2 rounded-lg overflow-clip top-10 min-w-64 z-30 ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
            {config.nav.map(({ name, href }, i, a) => (
              <Link
                onClick={() => setNavOpen(false)}
                href={href} key={name} className={`dark:bg-gray-700 bg-white dark:hover:bg-gray-500 hover:bg-gray-200 duration-300 transform-gpu flex w-full justify-start py-2 px-4 ${!navOpen ? 'pointer-events-none' : null}`}>
                <span className="text-gray-700 dark:text-white">{name}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </NavWrapper>
  );
}
