import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Filter, Star, Eye, TrendingUp, ChevronRight, X } from "lucide-react";
import { allPlayers, clubs, getSavedWatchlist, saveWatchlist, PlayerDetails } from "@/data/market";
import { PlayerAvatar, Crest } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/players")({
  head: () => ({
    meta: [
      { title: "Players Database — FTM Transfer Market" },
      { name: "description", content: "Browse, filter and search top football players, market values and statistics." },
    ],
  }),
  component: PlayersPage,
});

export function PlayersPage() {
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("ALL");
  const [leagueFilter, setLeagueFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<"value" | "rating" | "age">("value");
  const [watchlist, setWatchlist] = useState<string[]>(getSavedWatchlist());
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerDetails | null>(null);

  const toggleWatchlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const updated = watchlist.includes(id)
      ? watchlist.filter((w) => w !== id)
      : [...watchlist, id];
    setWatchlist(updated);
    saveWatchlist(updated);
  };

  const filteredPlayers = useMemo(() => {
    return allPlayers
      .filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.pos.toLowerCase().includes(search.toLowerCase()) ||
          p.nationality.toLowerCase().includes(search.toLowerCase());

        const matchesPos = positionFilter === "ALL" ||
          (positionFilter === "FW" && ["ST", "LW", "RW", "CF"].includes(p.pos)) ||
          (positionFilter === "MF" && ["CM", "CAM", "CDM", "LM", "RM"].includes(p.pos)) ||
          (positionFilter === "DF" && ["CB", "LB", "RB", "LWB", "RWB"].includes(p.pos));

        const clubObj = clubs[p.club];
        const matchesLeague = leagueFilter === "ALL" || (clubObj && clubObj.league === leagueFilter);

        return matchesSearch && matchesPos && matchesLeague;
      })
      .sort((a, b) => {
        if (sortBy === "value") return b.numericValue - a.numericValue;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "age") return a.age - b.age;
        return 0;
      });
  }, [search, positionFilter, leagueFilter, sortBy]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Player Database</h1>
          <p className="text-sm text-muted-foreground">
            Explore world-class talent, market value metrics, and technical statistics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            {filteredPlayers.length} Players Found
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="grid gap-3 panel p-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by player name, position or country..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center rounded-lg border border-border bg-background p-1 text-xs">
            <Filter className="mx-2 h-3.5 w-3.5 text-muted-foreground" />
            {["ALL", "FW", "MF", "DF"].map((pos) => (
              <button
                key={pos}
                type="button"
                onClick={() => setPositionFilter(pos)}
                className={cn(
                  "rounded-md px-2.5 py-1 font-medium transition-colors",
                  positionFilter === pos
                    ? "bg-primary text-primary-foreground font-bold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pos}
              </button>
            ))}
          </div>

          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
          >
            <option value="ALL">All Leagues</option>
            <option value="Premier League">Premier League</option>
            <option value="La Liga">La Liga</option>
            <option value="Bundesliga">Bundesliga</option>
            <option value="Serie A">Serie A</option>
            <option value="Ligue 1">Ligue 1</option>
          </select>

          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="h-9 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
          >
            <option value="value">Sort: Value High to Low</option>
            <option value="rating">Sort: Highest Rating</option>
            <option value="age">Sort: Youngest First</option>
          </select>
        </div>
      </div>

      {/* Player Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredPlayers.map((player) => {
          const clubObj = clubs[player.club];
          const isStarred = watchlist.includes(player.id);
          return (
            <div
              key={player.id}
              onClick={() => setSelectedPlayer(player)}
              className="group cursor-pointer panel flex flex-col justify-between p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <PlayerAvatar name={player.name} size={48} />
                  <div>
                    <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                      {player.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <span className="rounded bg-secondary px-1.5 py-0.5 font-semibold text-foreground">
                        {player.pos}
                      </span>
                      <span>•</span>
                      <span>{player.nationality}</span>
                      <span>•</span>
                      <span>{player.age} yrs</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleWatchlist(player.id, e)}
                  title={isStarred ? "Remove from watchlist" : "Add to watchlist"}
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full border transition-all",
                    isStarred
                      ? "border-amber-500/40 bg-amber-500/10 text-amber-400"
                      : "border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Star className={cn("h-4 w-4", isStarred && "fill-amber-400")} />
                </button>
              </div>

              {/* Club & Stats */}
              <div className="mt-4 border-t border-border/50 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Crest id={player.club} size={20} />
                    <span className="font-medium text-foreground">{clubObj?.name || player.club}</span>
                  </div>
                  <span className="text-muted-foreground">{player.matches} Apps</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Market Value</p>
                    <p className="text-base font-extrabold text-primary">{player.value}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Rating</p>
                    <p className="text-sm font-bold text-amber-400">★ {player.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPlayers.length === 0 && (
        <div className="panel p-12 text-center text-muted-foreground">
          <p className="text-lg font-semibold">No players matching your search criteria.</p>
          <p className="mt-1 text-xs">Try adjusting your filters or search keywords.</p>
        </div>
      )}

      {/* Player Detail Modal */}
      {selectedPlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="panel relative w-full max-w-lg p-6 bg-card border border-border shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPlayer(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              <PlayerAvatar name={selectedPlayer.name} size={64} />
              <div>
                <h2 className="text-xl font-extrabold">{selectedPlayer.name}</h2>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <Crest id={selectedPlayer.club} size={20} />
                  <span>{clubs[selectedPlayer.club]?.name}</span>
                  <span>•</span>
                  <span>{selectedPlayer.pos}</span>
                  <span>•</span>
                  <span>Age {selectedPlayer.age}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-secondary/40 p-3 text-center">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Market Value</p>
                <p className="mt-1 text-lg font-extrabold text-primary">{selectedPlayer.value}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Goals / Assists</p>
                <p className="mt-1 text-base font-bold">{selectedPlayer.goals} G / {selectedPlayer.assists} A</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Contract</p>
                <p className="mt-1 text-base font-bold">Until {selectedPlayer.contractUntil}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => toggleWatchlist(selectedPlayer.id)}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary py-2 text-sm font-semibold hover:bg-muted"
              >
                <Star className={cn("h-4 w-4", watchlist.includes(selectedPlayer.id) && "fill-amber-400 text-amber-400")} />
                {watchlist.includes(selectedPlayer.id) ? "In Watchlist" : "Add to Watchlist"}
              </button>
              <button
                type="button"
                onClick={() => setSelectedPlayer(null)}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
