import Link from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import NavWrapper from "@/components/NavWrapper";
import config from "@/config";

export default function Navbar() {
  return (
    <NavWrapper>
      <div className="flex w-full max-w-6xl flex-nowrap items-center justify-between">
        <div className="flex flex-shrink-0 space-x-0 md:space-x-2">
          <div className="my-1 inline-block">
            <Link
              href="/"
              className="flex items-center justify-between rounded px-2.5 py-1.5 text-gray-900 dark:text-gray-100 "
            >
              <span className="flex select-none items-center justify-between pr-2 text-sm" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={config.headshot} className="w-10" alt="headshot image"/>
              </span>
              <span className="font-bold">{config.name}</span>
            </Link>
          </div>
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
        <ThemeSwitch />
      </div>
    </NavWrapper>
  );
}
