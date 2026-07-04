import type { Metadata } from "next";
import ReelsFeed from "@/components/community/ReelsFeed";

export const metadata: Metadata = {
  title: "Real Peeps — Community Recipes",
  description: "A full-screen, scrollable feed of recipes real people cooked with Anveshan products.",
};

export default function RealPeepsPage() {
  return <ReelsFeed />;
}
