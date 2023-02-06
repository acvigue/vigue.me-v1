import "@/styles/global.scss";
import "@/styles/casper.css";
import "@/styles/cards.css";
import "@/styles/prism-tomorrow.css";
import "@/styles/prism-line-numbers.css";
import "katex/dist/katex.min.css";

import "@fontsource/inter";
import "@fontsource/lora";
import "@fontsource/jetbrains-mono";
import "@fontsource/ibm-plex-mono";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ThemeContext from "@/components/ThemeContext";
import { ServerThemeProvider } from "@wits/next-themes";

export const revalidate = 3600;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerThemeProvider attribute="class">
      <html lang="en">
        <head/>
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
    </ServerThemeProvider>
  );
}
