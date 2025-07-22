"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = (name: string, params: object) => {
  window.gtag("event", name, params);
};

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_TRACKING_ID) {
      const url = new URL(pathname, window.location.origin);
      searchParams.forEach((value, key) => {
        url.searchParams.append(key, value);
      });
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null;
}
