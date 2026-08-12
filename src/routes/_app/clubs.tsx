import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Building2, Users, Trophy, DollarSign, X } from "lucide-react";
import { clubs, allPlayers, Club } from "@/data/market";
import { Crest, PlayerAvatar } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/clubs")({
  head: () => ({
    meta: [
      { title: "Clubs Directory — FTM Transfer Market" },
      { name: "description", content: "Explore top football clubs, transfer budgets, squad rosters and manager details." },
    ],
  }),
  component: ClubsPage,
});

export function ClubsPage() {
  const [search, setSearch] = useState("");
  const [leagueFilter, setLeagueFilter] = useState("ALL");
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);

  const clubList = useMemo(() => Object.values(clubs), []);

  const filteredClubs = useMemo(() => {
    return clubList.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.short.toLowerCase().includes(search.toLowerCase()) ||
        c.country.toLowerCase().includes(search.toLowerCase());

      const matchesLeague = leagueFilter === "ALL" || c.league === leagueFilter;
      return matchesSearch && matchesLeague;
    });
  }, [clubList, search, leagueFilter]);

  const clubSquad = useMemo(() => {
    if (!selectedClub) return [];
    return allPlayers.filter((p) => p.club === selectedClub.id);
  }, [selectedClub]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Football Clubs</h1>
          <p className="text-sm text-muted-foreground">
            Rosters, transfer budgets, and manager profiles across top European and global leagues
          </p>
        </div>
        <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
          {filteredClubs.length} Clubs
        </span>
      </div>

      {/* Filters Bar */}
      <div className="grid gap-3 panel p-4 md:flex md:items-center md:justify-between">
        <div className="relative flex-1 md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by club name, abbreviation or country..."
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>

        <select
          value={leagueFilter}
          onChange={(e) => setLeagueFilter(e.target.value)}
          className="h-10 rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
        >
          <option value="ALL">All Leagues</option>
          <option value="Premier League">Premier League</option>
          <option value="La Liga">La Liga</option>
          <option value="Bundesliga">Bundesliga</option>
          <option value="Serie A">Serie A</option>
          <option value="Ligue 1">Ligue 1</option>
          <option value="Saudi Pro League">Saudi Pro League</option>
        </select>
      </div>

      {/* Clubs Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredClubs.map((club) => (
          <div
            key={club.id}
            onClick={() => setSelectedClub(club)}
            className="group cursor-pointer panel flex flex-col justify-between p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Crest id={club.id} size={42} />
              <div>
                <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                  {club.name}
                </h3>
                <p className="text-xs text-muted-foreground">{club.league} • {club.country}</p>
              </div>
            </div>

            <div className="mt-4 border-t border-border/50 pt-3 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Manager</span>
                <span className="font-semibold text-foreground">{club.manager}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stadium</span>
                <span className="font-medium text-foreground">{club.stadium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Est. Budget</span>
                <span className="font-bold text-primary">{club.budget}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Club Profile Modal */}
      {selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="panel relative w-full max-w-xl p-6 bg-card border border-border shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedClub(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-lg bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-4">
              <Crest id={selectedClub.id} size={56} />
              <div>
                <h2 className="text-2xl font-extrabold">{selectedClub.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedClub.league} ({selectedClub.country})</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 rounded-xl bg-secondary/40 p-4 text-center">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Manager</p>
                <p className="mt-1 text-sm font-bold">{selectedClub.manager}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Stadium</p>
                <p className="mt-1 text-sm font-bold">{selectedClub.stadium}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase font-semibold">Transfer Budget</p>
                <p className="mt-1 text-base font-extrabold text-primary">{selectedClub.budget}</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
                Featured Squad Players ({clubSquad.length})
              </h3>
              {clubSquad.length > 0 ? (
                <div className="space-y-2">
                  {clubSquad.map((player) => (
                    <div key={player.id} className="flex items-center justify-between rounded-lg bg-background p-2.5 text-xs">
                      <div className="flex items-center gap-3">
                        <PlayerAvatar name={player.name} size={32} />
                        <div>
                          <p className="font-bold">{player.name}</p>
                          <p className="text-[10px] text-muted-foreground">{player.pos} • Age {player.age}</p>
                        </div>
                      </div>
                      <span className="font-extrabold text-primary">{player.value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground italic">No featured squad players recorded.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
