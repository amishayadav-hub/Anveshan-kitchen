import { pdpUrlForProduct } from "@/lib/product-highlight";
import { withUtm } from "@/lib/utm";

// The interchangeable Anveshan cooking oils. Any recipe that recommends one of
// these can use the others — this note surfaces that (and cross-sells the rest).
const OILS: { id: string; name: string }[] = [
  { id: "groundnut-oil", name: "Groundnut Oil" },
  { id: "mustard-oil", name: "Mustard Oil" },
  { id: "sunflower-oil", name: "Sunflower Oil" },
  { id: "coconut-oil", name: "Coconut Oil" },
  { id: "sesame-oil", name: "Black Sesame Oil" },
  { id: "olive-oil", name: "Olive Oil" },
];

const OIL_IDS = new Set(OILS.map((o) => o.id));
export const isOilProduct = (productId: string) => OIL_IDS.has(productId);

// Small alert shown under a recommended oil: "You can also use <other oils>".
// `variant="box"` (default) = bordered card for the shop panel;
// `variant="inline"` = light one-liner for the ingredients list.
export default function OilSwapNote({
  productId,
  variant = "box",
}: {
  productId: string;
  variant?: "box" | "inline";
}) {
  const others = OILS.filter((o) => o.id !== productId);
  if (others.length === 0) return null;

  const links = others.map((o, i) => {
    const url = pdpUrlForProduct(o.id);
    return (
      <span key={o.id}>
        {url ? (
          <a
            href={withUtm(url, "oil_swap")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-anv-green hover:underline"
          >
            {o.name}
          </a>
        ) : (
          <span className="font-medium text-anv-green">{o.name}</span>
        )}
        {i < others.length - 1 ? " / " : ""}
      </span>
    );
  });

  if (variant === "inline") {
    return (
      <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
        💡 You can also use {links} as per your preference.
      </p>
    );
  }

  return (
    <div className="mt-2 flex gap-1.5 rounded-lg border border-anv-green/20 bg-anv-green/5 px-2.5 py-2 text-[11px] leading-relaxed text-gray-600">
      <span aria-hidden="true">💡</span>
      <p>You can also use {links} as per your preference.</p>
    </div>
  );
}
