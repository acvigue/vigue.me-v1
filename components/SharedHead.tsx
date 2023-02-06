import config from "@/config";

export default function SharedHead() {
  return (
    <>
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
    </>
  );
}
