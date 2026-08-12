import { Search, Bell, ChevronDown, Menu } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const links = [
  { label: "Home", path: "/" },
  { label: "Players", path: "/players" },
  { label: "Clubs", path: "/clubs" },
  { label: "Transfers", path: "/transfers" },
  { label: "Rumours", path: "/rumours" },
  { label: "Market", path: "/market" },
  { label: "Analytics", path: "/analytics" },
  { label: "AI Analyst", path: "/ai-analyst" },
];

export function TopBar({
  currentPath,
  onOpenMenu,
}: {
  currentPath: string;
  onOpenMenu?: () => void;
}) {
  return (
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-background/85 px-4 py-3 backdrop-blur-xl md:gap-4 md:px-6">
      <div className="flex min-w-0 items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onOpenMenu}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary transition-colors hover:bg-muted lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>

        <label className="relative flex min-w-0 flex-1 items-center md:max-w-sm">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            aria-label="Search players, clubs, leagues"
            placeholder="Search players, clubs, leagues..."
            className="h-9 w-full rounded-full border border-border bg-card pr-10 pl-9 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-primary/15"
          />
          <kbd className="absolute right-3 hidden rounded border border-border px-1 text-[10px] text-muted-foreground sm:block">
            /
          </kbd>
        </label>

        <nav className="hidden min-w-0 items-center gap-5 overflow-x-auto xl:flex">
          {links.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={cn(
                "relative shrink-0 py-1.5 text-sm font-medium transition-colors",
                currentPath === l.path
                  ? "text-primary after:absolute after:inset-x-0 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          title="Notifications"
          className="relative grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-0.5 right-0.5 grid h-4 w-4 place-items-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
            3
          </span>
        </button>
        <Link
          to="/settings"
          className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pr-2 pl-1 transition-colors hover:border-primary/40"
        >
          <span
            className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold"
            style={{
              background: "linear-gradient(145deg, oklch(0.5 0.1 143), oklch(0.3 0.06 143))",
              color: "oklch(0.95 0.05 143)",
            }}
          >
            FT
          </span>
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block truncate text-xs font-semibold">FTM User</span>
            <span className="block truncate text-[10px] text-muted-foreground">Free Tier</span>
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div>
    </header>
  );
}
