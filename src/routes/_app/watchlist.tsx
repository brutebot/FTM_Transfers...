import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Star, Trash2, Search, ArrowRight } from "lucide-react";
import { allPlayers, clubs, getSavedWatchlist, saveWatchlist } from "@/data/market";
import { PlayerAvatar, Crest } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/watchlist")({
  head: () => ({
    meta: [
      { title: "Saved Watchlist — FTM Transfer Market" },
      { name: "description", content: "Track your favorite players, market values, and transfer news in your personal watchlist." },
    ],
  }),
  component: WatchlistPage,
});

export function WatchlistPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(getSavedWatchlist());
  const [search, setSearch] = useState("");

  const watchedPlayers = useMemo(() => {
    return allPlayers.filter((p) => watchlistIds.includes(p.id))
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.pos.toLowerCase().includes(search.toLowerCase()));
  }, [watchlistIds, search]);

  const removePlayer = (id: string) => {
    const updated = watchlistIds.filter((w) => w !== id);
    setWatchlistIds(updated);
    saveWatchlist(updated);
  };

  const totalValue = useMemo(() => {
    return watchedPlayers.reduce((acc, curr) => acc + curr.numericValue, 0);
  }, [watchedPlayers]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Personal Player Watchlist</h1>
          <p className="text-sm text-muted-foreground">
            Track market fluctuations, transfer news, and contract deadlines for your shortlisted talent
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-border bg-card px-4 py-2 text-right">
            <span className="text-[10px] text-muted-foreground uppercase font-semibold">Total Watchlist Valuation</span>
            <p className="text-lg font-black text-primary">€{totalValue}M</p>
          </div>
        </div>
      </div>

      {/* Filter / Search */}
      <div className="panel p-4 flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search within your watchlist..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <span className="text-xs text-muted-foreground font-semibold">
          {watchedPlayers.length} / {allPlayers.length} Tracked
        </span>
      </div>

      {/* Watchlist Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {watchedPlayers.map((player) => (
          <div key={player.id} className="panel relative flex flex-col justify-between p-4 transition-all hover:border-primary/50">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <PlayerAvatar name={player.name} size={48} />
                  <div>
                    <h3 className="font-bold text-base">{player.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                      <span className="rounded bg-secondary px-1.5 py-0.5 font-semibold text-foreground">
                        {player.pos}
                      </span>
                      <span>•</span>
                      <span>Age {player.age}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removePlayer(player.id)}
                  title="Remove from watchlist"
                  className="grid h-8 w-8 place-items-center rounded-lg border border-border bg-secondary text-muted-foreground hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-4 border-t border-border/50 pt-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Crest id={player.club} size={18} />
                  <span className="font-medium text-foreground">{clubs[player.club]?.name}</span>
                </div>
                <span className="text-muted-foreground font-semibold">Rating: ★ {player.rating}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-secondary/40 p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Valuation</span>
                <p className="text-base font-black text-primary">{player.value}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Contract</span>
                <p className="text-xs font-bold text-foreground">Until {player.contractUntil}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {watchedPlayers.length === 0 && (
        <div className="panel p-12 text-center text-muted-foreground">
          <Star className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
          <p className="text-lg font-semibold">Your watchlist is currently empty.</p>
          <p className="mt-1 text-xs">Browse the Players directory to star and track player valuations.</p>
        </div>
      )}
    </div>
  );
}
