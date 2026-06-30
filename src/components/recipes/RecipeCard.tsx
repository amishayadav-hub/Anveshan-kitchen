import Link from "next/link";
import Image from "next/image";
import { memo } from "react";
import { Recipe, AnveshanProduct } from "@/types";
import { getCategoryLabel, getSubLabel } from "@/lib/categories";
import BuyRecipeButton from "@/components/ui/BuyRecipeButton";

interface Props {
  recipe: Recipe;
  productMap?: Record<string, AnveshanProduct>;
  priority?: boolean;
}

function RecipeCard({ recipe, productMap = {}, priority = false }: Props) {
  const subLabel = getSubLabel(recipe.category, recipe.subCategory);
  const categoryLabel = subLabel ?? getCategoryLabel(recipe.category);

  // Resolve the recipe's Anveshan products (for image circles + cart)
  const recipeProducts: AnveshanProduct[] = recipe.anveshanProducts
    .map((id) => productMap[id])
    .filter(Boolean);

  const total = recipeProducts.reduce((sum, p) => sum + (p.price || 0), 0);

  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group flex h-full flex-col bg-white border border-gray-100 hover:border-anv-green/30 hover:shadow-md transition-all duration-200 rounded-xl overflow-hidden [content-visibility:auto] [contain-intrinsic-size:auto_280px]"
    >
      {/* Image — compact, recipes are supporting content */}
      <div className="relative h-32 w-full bg-anv-cream/30 overflow-hidden">
        <Image
          src={recipe.image || "/placeholder-recipe.jpg"}
          alt={recipe.name}
          fill
          priority={priority}
          // Wikimedia 429s the server-side optimizer; load those directly.
          unoptimized={/upload\.wikimedia\.org/.test(recipe.image || "")}
          className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
        />
        <span className="absolute top-2 left-2 bg-white/90 text-anv-green text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full">
          {categoryLabel}
        </span>
        <VegMark isVeg={recipe.isVeg !== false} />
      </div>

      {/* Content — fixed-height title/description blocks keep every card's buy
          row aligned across a grid row regardless of name/description length. */}
      <div className="p-3 flex flex-1 flex-col">
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-anv-green transition-colors truncate">
          {recipe.name}
        </h3>
        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed min-h-[2.4rem]">
          {recipe.description}
        </p>
        <p className="text-xs text-gray-500 mt-2 whitespace-nowrap">
          <span className="text-anv-green font-semibold">{recipeProducts.length} Anveshan</span>
          {total > 0 && <> · ₹{total}</>}
        </p>

        {/* Buy row: product-image circles + Add to Cart pill — pinned to bottom */}
        <div className="mt-auto">
          <BuyRecipeButton products={recipeProducts} />
        </div>
      </div>
    </Link>
  );
}

export default memo(RecipeCard);

// Standard veg / non-veg food mark (green square+dot / red square+triangle).
function VegMark({ isVeg }: { isVeg: boolean }) {
  const color = isVeg ? "border-green-600" : "border-red-600";
  return (
    <span
      className="absolute top-2 right-2 bg-white/90 rounded-[4px] p-0.5"
      title={isVeg ? "Vegetarian" : "Non-vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`flex w-3.5 h-3.5 items-center justify-center border-[1.5px] rounded-[3px] ${color}`}>
        {isVeg ? (
          <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
        ) : (
          <span className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-red-600" />
        )}
      </span>
    </span>
  );
}
