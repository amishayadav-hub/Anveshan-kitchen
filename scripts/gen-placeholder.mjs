// Generates public/placeholder-recipe.jpg — the fallback image shown for recipes
// that don't yet have a photo. A real 200 asset (not a 404), on-brand and neutral
// so it reads fine when object-cover crops it in cards. Regenerate with:
//   node scripts/gen-placeholder.mjs
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, "..", "public", "placeholder-recipe.jpg");

const W = 1200;
const H = 900;
const CREAM = "#F3E9DB";
const GREEN = "#235A49";

// Centred plate + fork/knife mark (pure vector paths — no fonts needed to render)
// plus a subtle wordmark. Content kept in the middle so card cropping never
// clips it.
const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <g transform="translate(600 400)" stroke="${GREEN}" stroke-width="9"
     fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.5">
    <!-- plate -->
    <circle cx="0" cy="0" r="150"/>
    <circle cx="0" cy="0" r="96"/>
    <!-- fork (left) -->
    <g transform="translate(-235 0)">
      <path d="M-26 -140 V -70 M0 -140 V -70 M26 -140 V -70"/>
      <path d="M-26 -70 H26 M0 -70 V 150"/>
    </g>
    <!-- knife (right) -->
    <g transform="translate(235 0)">
      <path d="M0 -140 C 26 -110 26 -70 0 -40 L0 150"/>
    </g>
  </g>
  <text x="600" y="650" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="52"
        fill="${GREEN}" opacity="0.65">Anveshan Kitchen</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(out);
console.log("Wrote", out);
