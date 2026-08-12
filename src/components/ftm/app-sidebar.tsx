import {
  Home,
  Users,
  Building2,
  ArrowLeftRight,
  Radio,
  LineChart,
  BarChart3,
  Bot,
  Star,
  Shield,
  Settings,
  X,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const mainNav = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Players", icon: Users, path: "/players" },
  { label: "Clubs", icon: Building2, path: "/clubs" },
  { label: "Transfers", icon: ArrowLeftRight, path: "/transfers" },
  { label: "Rumours", icon: Radio, path: "/rumours" },
  { label: "Market", icon: LineChart, path: "/market" },
  { label: "Analytics", icon: BarChart3, path: "/analytics" },
  { label: "AI Analyst", icon: Bot, path: "/ai-analyst" },
];

const secondary = [
  { label: "Watchlist", icon: Star, path: "/watchlist" },
  { label: "My Club", icon: Shield, path: "/my-club" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

function NavList({
  items,
  currentPath,
  onNavigate,
}: {
  items: typeof mainNav;
  currentPath: string;
  onNavigate?: (() => void) | undefined;
}) {
  return (
    <nav className="flex flex-col gap-0.5">
      {items.map(({ label, icon: Icon, path }) => {
        const isActive = currentPath === path;
        return (
          <Link
            key={label}
            to={path}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:translate-x-0.5 hover:bg-secondary/70 hover:text-foreground",
            )}
          >
            <span
              className={cn(
                "absolute top-1/2 left-0 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-0",
              )}
            />
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
              )}
            />
            <span className="truncate">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBody({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: (() => void) | undefined;
}) {
  return (
    <>
      <div className="flex items-center gap-2.5 px-2 pb-3">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-[var(--shadow-glow)]">
          <Shield className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-lg leading-none font-black tracking-tight">FTM</p>
          <p className="truncate text-[9px] tracking-[0.2em] text-muted-foreground uppercase">
            Transfer Market
          </p>
        </div>
      </div>

      <NavList items={mainNav} currentPath={currentPath} onNavigate={onNavigate} />

      <div className="border-t border-sidebar-border pt-3">
        <p className="px-3 pb-1.5 text-[9px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
          Personal
        </p>
        <NavList items={secondary} currentPath={currentPath} onNavigate={onNavigate} />
      </div>

      <div className="mt-auto rounded-xl border border-sidebar-border bg-card p-4 text-center">
        <p className="text-[11px] text-muted-foreground">Your Watchlist</p>
        <p className="mt-1 text-4xl font-black text-primary tabular-nums">12</p>
        <p className="text-[11px] text-muted-foreground">Players tracked</p>
        <Link
          to="/watchlist"
          onClick={onNavigate}
          className="mt-3 block w-full rounded-lg bg-primary px-3 py-2 text-center text-xs font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          View Watchlist
        </Link>
      </div>
    </>
  );
}

export function AppSidebar({
  currentPath,
  mobileOpen,
  onCloseMobile,
}: {
  currentPath: string;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}) {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[212px] shrink-0 flex-col gap-3 border-r border-sidebar-border bg-sidebar px-3 py-4 lg:flex">
        <SidebarBody currentPath={currentPath} />
      </aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={onCloseMobile}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <aside className="relative flex h-full w-[252px] flex-col gap-3 border-r border-sidebar-border bg-sidebar px-3 py-4">
            <button
              type="button"
              onClick={onCloseMobile}
              aria-label="Close menu"
              className="absolute top-4 right-3 grid h-8 w-8 place-items-center rounded-lg bg-secondary text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarBody currentPath={currentPath} onNavigate={onCloseMobile} />
          </aside>
        </div>
      ) : null}
    </>
  );
}
