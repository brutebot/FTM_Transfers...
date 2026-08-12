import { useState } from "react";
import { Outlet, useMatches } from "@tanstack/react-router";
import { AppSidebar } from "./app-sidebar";
import { TopBar } from "./topbar";

export function AppLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const matches = useMatches();
  const lastMatch = matches[matches.length - 1];
  const currentPath = lastMatch?.fullPath ?? "/";

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar
        currentPath={currentPath}
        mobileOpen={menuOpen}
        onCloseMobile={() => setMenuOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar currentPath={currentPath} onOpenMenu={() => setMenuOpen(true)} />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
