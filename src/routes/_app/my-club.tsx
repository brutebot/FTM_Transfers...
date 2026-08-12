import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Shield, Users, ArrowRight, DollarSign, Radio, CheckCircle2 } from "lucide-react";
import { clubs, allPlayers, latestTransfers, hotRumours, getSavedMyClub, saveMyClub } from "@/data/market";
import { Crest, PlayerAvatar } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/my-club")({
  head: () => ({
    meta: [
      { title: "My Club Dashboard — FTM Transfer Market" },
      { name: "description", content: "Personalized club dashboard for tracking squad roster, incoming transfers and rumours." },
    ],
  }),
  component: MyClubPage,
});

export function MyClubPage() {
  const [selectedClubId, setSelectedClubId] = useState<string>(getSavedMyClub());

  const currentClub = clubs[selectedClubId] ?? clubs["manutd"] ?? Object.values(clubs)[0];

  const handleSelectClub = (id: string) => {
    setSelectedClubId(id);
    saveMyClub(id);
  };

  const squad = useMemo(() => {
    if (!currentClub) return [];
    return allPlayers.filter((p) => p.club === currentClub.id);
  }, [currentClub]);

  const clubTransfers = useMemo(() => {
    if (!currentClub) return [];
    return latestTransfers.filter((t) => t.from === currentClub.id || t.to === currentClub.id);
  }, [currentClub]);

  const clubRumours = useMemo(() => {
    if (!currentClub) return [];
    return hotRumours.filter((r) => r.from === currentClub.id || r.to === currentClub.id);
  }, [currentClub]);

  if (!currentClub) return null;

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Selector */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between panel p-5">
        <div className="flex items-center gap-4">
          <Crest id={currentClub.id} size={56} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold tracking-tight">{currentClub.name}</h1>
              <span className="rounded-full bg-primary/10 border border-primary/30 px-2.5 py-0.5 text-[10px] font-bold text-primary">
                MY CLUB
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {currentClub.league} • Manager: {currentClub.manager}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-muted-foreground">Switch Favorite Club:</label>
          <select
            value={currentClub.id}
            onChange={(e) => handleSelectClub(e.target.value)}
            className="h-10 rounded-lg border border-border bg-background px-3 text-xs font-bold outline-none focus:border-primary"
          >
            {Object.values(clubs).map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.short})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Stadium</p>
            <p className="mt-1 text-lg font-black text-foreground">{currentClub.stadium}</p>
          </div>
          <Shield className="h-6 w-6 text-primary" />
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Estimated Transfer Budget</p>
            <p className="mt-1 text-xl font-black text-primary">{currentClub.budget}</p>
          </div>
          <DollarSign className="h-6 w-6 text-primary" />
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Featured Roster Players</p>
            <p className="mt-1 text-xl font-black text-foreground">{squad.length} Players</p>
          </div>
          <Users className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Squad List */}
        <div className="panel p-5">
          <h3 className="text-base font-bold mb-4 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Squad Roster Highlight
          </h3>
          {squad.length > 0 ? (
            <div className="space-y-3">
              {squad.map((p) => (
                <div key={p.id} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
                  <div className="flex items-center gap-3">
                    <PlayerAvatar name={p.name} size={36} />
                    <div>
                      <p className="font-bold text-sm">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.pos} • Age {p.age}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-primary">{p.value}</p>
                    <p className="text-[10px] text-muted-foreground">Until {p.contractUntil}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground italic">No featured squad players found for this club.</p>
          )}
        </div>

        {/* Transfers & Rumours */}
        <div className="flex flex-col gap-6">
          <div className="panel p-5">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              Club Transfer Activity
            </h3>
            {clubTransfers.length > 0 ? (
              <div className="space-y-3">
                {clubTransfers.map((t) => (
                  <div key={t.id} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
                    <div className="flex items-center gap-3">
                      <PlayerAvatar name={t.name} size={36} />
                      <div>
                        <p className="font-bold">{t.name}</p>
                        <p className="text-[10px] text-muted-foreground">{t.from} → {t.to}</p>
                      </div>
                    </div>
                    <span className="font-extrabold text-primary">{t.fee}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No recent transfer activity logged.</p>
            )}
          </div>

          <div className="panel p-5">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <Radio className="h-4 w-4 text-amber-400" />
              Targeted Transfer Rumours
            </h3>
            {clubRumours.length > 0 ? (
              <div className="space-y-3">
                {clubRumours.map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
                    <div>
                      <p className="font-bold">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground">Source: {r.source}</p>
                    </div>
                    <span className="font-bold text-amber-400">{r.chance}% Chance</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic">No current target rumours.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
