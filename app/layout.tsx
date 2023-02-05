import "@/styles/global.scss";
import "@/styles/casper.css";
import "@/styles/cards.css";

import "@fontsource/inter";
import "@fontsource/lora";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";

import "katex/dist/katex.min.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ThemeContext from "@/components/ThemeContext";
import config from "@/site.config";

export const revalidate = 3600;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        {/* icons */}
        <link href="/favicon.ico" rel="shortcut icon" />
        <link href="/webmanifest.json" rel="manifest" />
        <link href="/favicons/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <link href="/favicons/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
        <link href="/favicons/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
        <link color="#111827" href="/favicons/safari-pinned-tab.svg" rel="mask-icon" />

        {/* manifest */}
        <meta name="application-name" content={config.name} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={config.name} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#111827" />

        {/* misc */}
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
      </head>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <ThemeContext>
          <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
            <Navbar />
            <div className="flex flex-1 flex-col justify-center bg-white px-4 dark:bg-gray-900 sm:px-8">{children}</div>
            <Footer />
          </div>
        </ThemeContext>
        <Analytics />
      </body>
    </html>
  );
}
