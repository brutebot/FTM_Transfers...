import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ArrowRight, ArrowLeftRight, CheckCircle2, Clock } from "lucide-react";
import { latestTransfers, clubs } from "@/data/market";
import { Crest, PlayerAvatar } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/transfers")({
  head: () => ({
    meta: [
      { title: "Transfers Feed — FTM Transfer Market" },
      { name: "description", content: "Track confirmed football transfer deals, agreed terms, fees and medical checks." },
    ],
  }),
  component: TransfersPage,
});

export function TransfersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"fee" | "recent">("recent");

  const filteredTransfers = useMemo(() => {
    return latestTransfers
      .filter((t) => {
        const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.from.toLowerCase().includes(search.toLowerCase()) ||
          t.to.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "fee") return b.numericFee - a.numericFee;
        return b.id.localeCompare(a.id);
      });
  }, [search, statusFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Transfer Deals Feed</h1>
          <p className="text-sm text-muted-foreground">
            Official confirmed transfers, medicals, and finalized club-to-club agreements
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
          {filteredTransfers.length} Transfers Listed
        </span>
      </div>

      {/* Filters */}
      <div className="grid gap-3 panel p-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transfer by player or club..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-background p-1 text-xs">
            {["ALL", "Confirmed", "Agreed", "Medical"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "rounded-md px-3 py-1.5 font-medium transition-colors",
                  statusFilter === status
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
          >
            <option value="recent">Sort: Most Recent</option>
            <option value="fee">Sort: Highest Fee</option>
          </select>
        </div>
      </div>

      {/* Transfers List */}
      <div className="grid gap-3">
        {filteredTransfers.map((t) => {
          const fromClub = clubs[t.from];
          const toClub = clubs[t.to];
          return (
            <div
              key={t.id}
              className="panel flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between transition-all hover:border-primary/40"
            >
              <div className="flex items-center gap-4">
                <PlayerAvatar name={t.name} size={48} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base">{t.name}</h3>
                    <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-bold text-foreground">
                      {t.pos}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Crest id={t.from} size={16} />
                      <span>{fromClub?.name || t.from}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    <div className="flex items-center gap-1 font-semibold text-foreground">
                      <Crest id={t.to} size={16} />
                      <span>{toClub?.name || t.to}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-border/50 pt-3 md:border-t-0 md:pt-0">
                <div className="text-left md:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Transfer Fee</span>
                  <p className="text-lg font-extrabold text-primary">{t.fee}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-extrabold tracking-wide uppercase",
                      t.status === "Confirmed" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
                      t.status === "Medical" && "bg-sky-500/10 text-sky-400 border border-sky-500/30",
                      t.status === "Agreed" && "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                    )}
                  >
                    {t.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{t.when}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
