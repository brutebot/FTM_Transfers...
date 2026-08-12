import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Radio, ShieldAlert, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { hotRumours, clubs } from "@/data/market";
import { Crest, PlayerAvatar } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/rumours")({
  head: () => ({
    meta: [
      { title: "Hot Transfer Rumours — FTM Transfer Market" },
      { name: "description", content: "Latest verified transfer rumours, probability scores and journalist source citations." },
    ],
  }),
  component: RumoursPage,
});

export function RumoursPage() {
  const [search, setSearch] = useState("");
  const [reliabilityFilter, setReliabilityFilter] = useState("ALL");

  const filteredRumours = useMemo(() => {
    return hotRumours.filter((r) => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.from.toLowerCase().includes(search.toLowerCase()) ||
        r.to.toLowerCase().includes(search.toLowerCase()) ||
        r.source.toLowerCase().includes(search.toLowerCase());

      const matchesReliability = reliabilityFilter === "ALL" || r.reliability === reliabilityFilter;
      return matchesSearch && matchesReliability;
    });
  }, [search, reliabilityFilter]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Transfer Rumours Feed</h1>
          <p className="text-sm text-muted-foreground">
            Sourced transfer intelligence, journalist probability scores, and speculative market buzz
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
          {filteredRumours.length} Active Rumours
        </span>
      </div>

      {/* Filter Bar */}
      <div className="grid gap-3 panel p-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rumours by player, club or journalist..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Source Confidence:</span>
          <div className="flex items-center rounded-lg border border-border bg-background p-1 text-xs">
            {["ALL", "High", "Medium", "Low"].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setReliabilityFilter(level)}
                className={cn(
                  "rounded-md px-3 py-1 font-medium transition-colors",
                  reliabilityFilter === level
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Rumours Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredRumours.map((r) => {
          const fromClub = clubs[r.from];
          const toClub = clubs[r.to];
          return (
            <div key={r.id} className="panel flex flex-col justify-between p-5 transition-all hover:border-primary/50">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <PlayerAvatar name={r.name} size={44} />
                    <div>
                      <h3 className="font-bold text-base">{r.name}</h3>
                      <span className="text-xs text-muted-foreground">{r.pos} Position</span>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      r.reliability === "High" && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
                      r.reliability === "Medium" && "bg-amber-500/10 text-amber-400 border border-amber-500/30",
                      r.reliability === "Low" && "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                    )}
                  >
                    {r.reliability} Confidence
                  </span>
                </div>

                {/* Transfer Track */}
                <div className="mt-4 rounded-xl bg-secondary/40 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crest id={r.from} size={22} />
                    <span className="text-xs font-semibold">{fromClub?.name || r.from}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary" />
                  <div className="flex items-center gap-2">
                    <Crest id={r.to} size={22} />
                    <span className="text-xs font-semibold text-foreground">{toClub?.name || r.to}</span>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground font-medium">Transfer Probability</span>
                    <span className="font-extrabold text-primary">{r.chance}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${r.chance}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Source Footer */}
              <div className="mt-5 border-t border-border/50 pt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  Source: {r.source}
                </span>
                <span>Est. Fee: <strong className="text-primary">{r.fee}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
