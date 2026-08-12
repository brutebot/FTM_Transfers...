import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Settings, User, Bell, Database, ShieldCheck, Moon, RefreshCw, LogOut } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Configuration — FTM Transfer Market" },
      { name: "description", content: "Configure platform preferences, notification triggers and backend database status." },
    ],
  }),
  component: SettingsPage,
});

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    transfers: true,
    rumours: true,
    marketDips: false,
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Platform Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage account settings, alert notifications, and backend database integrations
        </p>
      </div>

      {/* Account Profile Card */}
      <div className="panel p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold">Analyst Profile</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Display Name</label>
            <input
              type="text"
              defaultValue="FTM Analyst"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="analyst@ftm-transfers.com"
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Database & Backend Status */}
      <div className="panel p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold">Backend & Database Infrastructure</h2>
        </div>

        <div className="rounded-xl bg-secondary/40 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "h-3 w-3 rounded-full animate-pulse",
                isSupabaseConfigured ? "bg-emerald-400" : "bg-amber-400"
              )}
            />
            <div>
              <p className="text-sm font-bold">Supabase PostgreSQL Database</p>
              <p className="text-xs text-muted-foreground">
                {isSupabaseConfigured
                  ? "Connected via VITE_SUPABASE_URL environment variable"
                  : "Running in local storage fallback mode (Supabase env variables not configured)"}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold uppercase",
              isSupabaseConfigured ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
            )}
          >
            {isSupabaseConfigured ? "Active" : "Local Mode"}
          </span>
        </div>
      </div>

      {/* Notifications Card */}
      <div className="panel p-6 space-y-4">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-base font-bold">Notification Triggers</h2>
        </div>

        <div className="space-y-3">
          <label className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30 cursor-pointer">
            <div>
              <p className="text-sm font-semibold">Confirmed Transfer Alerts</p>
              <p className="text-xs text-muted-foreground">Get instant notifications when top-tier deals are confirmed</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.transfers}
              onChange={(e) => setNotifications({ ...notifications, transfers: e.target.checked })}
              className="h-4 w-4 accent-primary cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/30 cursor-pointer">
            <div>
              <p className="text-sm font-semibold">High Confidence Rumours</p>
              <p className="text-xs text-muted-foreground">Notify when tier-1 journalists report new probability spikes</p>
            </div>
            <input
              type="checkbox"
              checked={notifications.rumours}
              onChange={(e) => setNotifications({ ...notifications, rumours: e.target.checked })}
              className="h-4 w-4 accent-primary cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Save Actions */}
      <div className="flex items-center justify-end gap-3">
        {savedSuccess && <span className="text-xs text-emerald-400 font-bold">Settings saved successfully!</span>}
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
