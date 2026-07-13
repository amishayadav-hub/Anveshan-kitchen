"use client";

import { useEffect } from "react";
import { readCampaignFromSearch, storeCampaign, getStoredCampaign, sendCampaign } from "@/lib/campaign";

// Mounted once in the root layout. On landing, if the URL carries utm_* params:
//  - stores FIRST-TOUCH attribution in a cookie (doesn't overwrite an existing one)
//  - records ONE "visit" for the arriving campaign per browser session
// Organic visits (no utm_*) do nothing → zero writes.
export default function CampaignTracker() {
  useEffect(() => {
    const fromUrl = readCampaignFromSearch(window.location.search);
    if (!fromUrl) return;

    // First-touch wins: only set the cookie if none exists yet.
    if (!getStoredCampaign()) storeCampaign(fromUrl);

    // Count the landing at most once per session.
    const flag = "anv_campaign_visit";
    try {
      if (!sessionStorage.getItem(flag)) {
        sessionStorage.setItem(flag, "1");
        sendCampaign({ type: "visit", ...fromUrl });
      }
    } catch {
      sendCampaign({ type: "visit", ...fromUrl });
    }
  }, []);

  return null;
}
