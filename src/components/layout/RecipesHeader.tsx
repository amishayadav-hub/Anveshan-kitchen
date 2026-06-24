import Link from "next/link";

export default function RecipesHeader() {
  return (
    <header className="bg-anv-green text-white">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/recipes" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-anv-cream flex items-center justify-center shrink-0">
            <span className="text-anv-green font-bold text-sm">A</span>
          </div>
          <div>
            <p className="font-bold text-white text-base leading-tight tracking-tight">anveshan.</p>
            <p className="text-white/60 text-xs leading-tight">kitchen</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5 text-sm text-white/80">
          <Link href="/recipes" className="hover:text-white transition-colors">
            Recipes
          </Link>
          <Link href="/recipes/generate" className="hover:text-white transition-colors">
            ✨ AI Generator
          </Link>
          <Link
            href="/recipes/share"
            className="bg-anv-cream text-anv-green px-4 py-1.5 rounded-full text-xs font-semibold hover:bg-white transition-colors shadow-sm"
          >
            + Share Your Recipe
          </Link>
        </nav>

        {/* Mobile: prominent Share button */}
        <Link
          href="/recipes/share"
          className="sm:hidden bg-anv-cream text-anv-green px-3 py-1.5 rounded-full text-xs font-semibold"
        >
          + Share
        </Link>
      </div>
    </header>
  );
}
