// READ-ONLY: cross-checks the 151 proposed regional recipes against the live
// Firestore `recipes` collection and against each other, so we know exactly how
// many are genuinely new before authoring anything. Writes nothing.
//
// Run:  npx tsx scripts/check-recipe-dupes.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";

const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
});
const db = getFirestore(app);

// Proposed list, grouped by region (verbatim from the request).
const PROPOSED: Record<string, string[]> = {
  rajasthani: [
    "mirch vada", "gatte ki sabji", "pyaaz kachori", "papad ki sabji", "aloo kachori",
    "matar kachori", "ghevar", "mawa malpua", "masala chaach", "sheera", "raab",
    "bathua raita", "dahi vada", "dal bati churma", "panchkuta", "kabuli", "makai roti",
    "mawa kachori", "gatte ka pulao", "makki ka dhokla", "churma ladoo", "malpua",
    "rajasthani kadhi", "mangodi ki sabji", "feeni", "mishri mawa", "lapsi", "besan chakki",
    "bafla", "milk cake", "balushahi", "mohanthal",
  ],
  punjabi: [
    "aloo paratha", "paneer paratha", "gobhi paratha", "mooli paratha", "palak paratha",
    "mix paratha", "ajwain paratha", "lachha paratha", "missi roti", "makke di roti",
    "chole bhature", "amritsari kulcha", "stuffed kulcha", "dal makhani", "punjabi kadhi pakora",
    "rajma masala", "chole", "pindi chole", "kala chana", "sarson ka saag", "palak corn",
    "chole pulao", "lobhia curry", "methi malai matar", "soya chaap", "afghani chaap",
    "masala chaap", "paneer butter masala", "shahi paneer", "kadhai paneer", "matar paneer",
    "paneer lababdar", "paneer do pyaza", "paneer bhurji", "achari paneer", "paneer tikka masala",
    "malai paneer", "aloo gobhi", "bhindi masala", "aloo methi", "jeera aloo", "tinda masala",
    "bharwa shimla mirch", "bharwa karela", "lauki chana dal", "gobhi matar", "mushroom masala",
  ],
  haryanvi: ["gulgule", "meethe chawal", "malpua", "shakkar para", "kachri chutney"],
  bihari: [
    "litti chokha", "sattu paratha", "dal pitha", "chana ghugni", "matar ghugni", "chura dahi",
    "chura gur", "dahi chura", "thekua", "pua", "kadhi badi", "aloo baingan", "parwal ki sabji",
    "parwal aloo", "nimona", "tehri", "bachka", "chana jor garam", "khaja", "anarsa", "tilkut",
    "lai", "khurma", "pedakiya", "belgarmi", "makhana kheer", "rasiya", "bagiya", "dhuska",
    "handia", "kasaar", "tikri",
  ],
  maharashtrian: [
    "misal pav", "dadpe poha", "sabudana vada", "ghavan", "amboli", "kothimbir vadi",
    "batata vada", "usal pav", "pithla", "amti", "matki usal", "misal", "usal", "aloo chi bhaji",
    "thondli bhaji", "patal bhaji", "valachi usal", "methi pithla", "kobi bhaji", "flower bhaji",
    "shepu bhaji", "padwal bhaji", "puran poli", "ukadiche modak", "fried modak", "amrakhand",
    "basundi", "rava laddoo", "karanji", "chirote", "solkadhi", "kokum sharbat", "panha", "taak",
  ],
};

const STOP = new Set(["ki", "ka", "ke", "di", "ku", "chi", "masala", "sabji", "sabzi", "curry", "recipe", "ki-sabji"]);
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .filter((w) => w && !STOP.has(w))
    .sort()
    .join(" ")
    .trim();
}

async function main() {
  const snap = await getDocs(collection(db, "recipes"));
  const existing = snap.docs.map((d) => ({ id: d.id, name: (d.data().name as string) || d.id }));
  const existingByNorm = new Map(existing.map((e) => [norm(e.name), e]));

  const all = Object.entries(PROPOSED).flatMap(([region, names]) => names.map((name) => ({ region, name })));

  const seen = new Map<string, string>(); // norm -> first name that used it
  const internalDupes: string[] = [];
  const alreadyExists: { name: string; region: string; match: string }[] = [];
  const brandNew: { name: string; region: string }[] = [];

  for (const { region, name } of all) {
    const n = norm(name);
    if (seen.has(n)) {
      internalDupes.push(`${name} (≈ ${seen.get(n)})`);
      continue;
    }
    seen.set(n, name);
    const hit = existingByNorm.get(n);
    if (hit) alreadyExists.push({ name, region, match: hit.name });
    else brandNew.push({ name, region });
  }

  console.log(`Live recipes in Firestore: ${existing.length}`);
  console.log(`Proposed (raw): ${all.length}`);
  console.log(`Internal duplicates in the list: ${internalDupes.length}`);
  internalDupes.forEach((d) => console.log(`   - ${d}`));
  console.log(`\nAlready in the database (skip): ${alreadyExists.length}`);
  alreadyExists.forEach((d) => console.log(`   = ${d.name}  ->  "${d.match}"`));
  console.log(`\nGenuinely NEW to author: ${brandNew.length}`);
  const byRegion: Record<string, number> = {};
  brandNew.forEach((d) => (byRegion[d.region] = (byRegion[d.region] || 0) + 1));
  console.log(`   by region: ${JSON.stringify(byRegion)}`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
