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
          <div className="my-1 inline-block">
            <Link href="/" className="flex items-center justify-between rounded py-1.5 pl-2.5 text-gray-900 dark:text-gray-100 ">
              <span className="flex select-none items-center justify-between pr-2 text-sm" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image width={40} height={40} src={config.headshot} className="w-8 md:w-10" alt="headshot image" />
              </span>
              <span className="font-bold">{config.name}</span>
            </Link>
          </div>
        </div>
        <div className="lg:flex-1 lg:flex justify-end hidden">
          {config.nav.map(({ name, href }, i, a) => (
            <div key={name} className="my-1 flex items-center">
              <Link
                href={href}
                className="flex items-center justify-between rounded px-2.5 py-1.5 text-gray-900 hover:bg-gray-100/20 dark:text-gray-100 dark:hover:bg-gray-800/20"
              >
                <span>{name}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex-1 justify-end flex lg:hidden pr-4 relative">
          <FiMenu size={24} onClick={() => setNavOpen(!navOpen)} style={{ 'cursor': 'pointer' }} />
          <div className={`transform-gpu duration-150 absolute shadow-2xl lg:hidden flex flex-col gap-[2px] bg-gray-700 rounded-lg overflow-clip top-10 min-w-64 ${navOpen ? 'opacity-100' : 'opacity-0'}`}>
            {config.nav.map(({ name, href }, i, a) => (
              <Link
                onClick={() => setNavOpen(false)}
                href={href} key={name} className={`flex w-full justify-start bg-gray-800 dark:hover:bg-gray-800/20 py-2 px-4 ${!navOpen ? 'pointer-events-none' : null}`}>
                <span>{name}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </NavWrapper>
  );
}
