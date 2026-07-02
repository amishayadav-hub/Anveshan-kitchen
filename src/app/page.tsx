import { permanentRedirect } from "next/navigation";

// Permanent (308) redirect so crawlers consolidate signal onto /recipes.
export default function Home() {
  permanentRedirect("/recipes");
}
