"use client";

import { config } from "@/config"
import { init, push } from "@socialgouv/matomo-next";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Matomo = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [inited, setInited] = useState(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    if (!inited && config.matomoSiteID && config.matomoURL) {
      init({
        url: config.matomoURL,
        siteId: config.matomoSiteID,
        onInitialization: () => {
          push(["requireCookieConsent"]);
          push(["enableHeartBeatTimer"]);
          push(["disableQueueRequest"]);
        },
      });

      setInited(true);
    }

    push(["rememberCookieConsentGiven"]);
  }, [inited]);

  /**
   * The @socialgouv/matomo-next does not work with next 13
   */
  useEffect(() => {
    if (!pathname) {
      return;
    }

    if (!previousPath) {
      return setPreviousPath(pathname);
    }

    push(["setReferrerUrl", `${previousPath}`]);
    push(["setCustomUrl", pathname]);
    push(["deleteCustomVariables", "page"]);
    setPreviousPath(pathname);
    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      push(["setDocumentTitle", document.title]);
      push(["trackPageView"]);
    });
    /**
     * This is because we don't want to track previousPath
     * could be a if (previousPath === pathname) return; instead
     * But be sure to not send the tracking twice
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return <></>;
};