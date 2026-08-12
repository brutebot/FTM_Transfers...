import { ArrowRight, MoveRight, Flame, Repeat, Handshake, Trophy, Users, Clock } from "lucide-react";
import {
  Crest,
  PanelHeader,
  PlayerAvatar,
  ProgressBar,
  Sparkline,
  StatusBadge,
  TrendPill,
  WatchlistButton,
} from "./primitives";
import {
  latestTransfers,
  hotRumours,
  negotiations,
  featuredPlayers,
  biggestTransfers,
  clubs,
} from "@/data/market";
import { cn } from "@/lib/utils";

function PanelFooterLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="group flex w-full items-center justify-between border-t border-border/70 px-4 py-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary/50 hover:text-foreground sm:px-5"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </button>
  );
}

const rowClass =
  "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/40 sm:px-5";

export function LatestTransfers() {
  return (
    <div className="panel flex flex-col">
      <PanelHeader title="Latest Transfers" subtitle="Confirmed deals" action="View all" icon={Repeat} />
      <ul className="flex-1 divide-y divide-border/60">
        {latestTransfers.map((t) => (
          <li key={t.name} className={rowClass}>
            <PlayerAvatar name={t.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{t.name}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">{t.pos}</span>
                <Crest id={t.from} size={18} />
                <MoveRight className="h-3 w-3" />
                <Crest id={t.to} size={18} />
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <p className="text-sm font-bold tabular-nums">{t.fee}</p>
              <StatusBadge status={t.status} />
              <p className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-2.5 w-2.5" />
                {t.when}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <PanelFooterLink label="See all transfers" />
    </div>
  );
}

export function HotRumours() {
  return (
    <div className="panel flex flex-col">
      <PanelHeader title="Hot Rumours" subtitle="Transfer probability" action="View all" icon={Flame} />
      <ul className="flex-1 divide-y divide-border/60">
        {hotRumours.map((r) => (
          <li key={r.name} className={cn(rowClass, "items-start")}>
            <PlayerAvatar name={r.name} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{r.name}</p>
              <div className="mt-1 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
                <Crest id={r.from} size={16} />
                <MoveRight className="h-3 w-3 shrink-0" />
                <Crest id={r.to} size={16} />
                <span className="truncate">{clubs[r.to]?.name}</span>
              </div>
              <ProgressBar
                value={r.chance}
                tone={r.chance >= 70 ? "primary" : r.chance >= 50 ? "warning" : "info"}
                className="mt-2"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold tabular-nums">{r.chance}%</p>
              <p className="text-[10px] text-muted-foreground">est. {r.fee}</p>
            </div>
          </li>
        ))}
      </ul>
      <PanelFooterLink label="See all rumours" />
    </div>
  );
}

const negTone = {
  Negotiating: "warning",
  "Offer Made": "info",
  Stalled: "destructive",
} as const;

export function LiveNegotiations() {
  return (
    <div className="panel flex flex-col">
      <PanelHeader
        title="Live Negotiations"
        subtitle="Offer vs asking price"
        action="View all"
        icon={Handshake}
      />
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {negotiations.map((n) => (
          <article
            key={n.name}
            className="rounded-xl border border-border/80 bg-surface/60 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-panel)]"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
              <PlayerAvatar name={n.name} size={34} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{n.name}</p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {n.pos} • {clubs[n.from]?.name} → {clubs[n.to]?.name}
                </p>
              </div>
              <StatusBadge status={n.status} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-background/60 px-2.5 py-2">
                <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Offer</p>
                <p className="text-sm font-bold tabular-nums text-primary">{n.offer}</p>
              </div>
              <div className="rounded-lg bg-background/60 px-2.5 py-2">
                <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Asking</p>
                <p className="text-sm font-bold tabular-nums">{n.asking}</p>
              </div>
            </div>

            <ProgressBar value={n.progress} tone={negTone[n.status]} className="mt-3" />
            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-[10px] text-muted-foreground">{n.progress}% to agreement</span>
              <button
                type="button"
                className="rounded-lg border border-border px-3 py-1.5 text-[11px] font-semibold transition-colors hover:border-primary/50 hover:bg-accent hover:text-accent-foreground"
              >
                View Negotiation
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function FeaturedPlayers() {
  return (
    <div className="panel">
      <PanelHeader
        title="Featured Players"
        subtitle="Market value & 30-day trend"
        action="View all"
        icon={Users}
      />
      <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 sm:p-5">
        {featuredPlayers.map((p) => (
          <article
            key={p.name}
            className="group rounded-xl border border-border/80 bg-surface/60 p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/35 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-2.5">
              <PlayerAvatar name={p.name} size={44} />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <div className="mt-1 flex min-w-0 items-center gap-1.5">
                  <Crest id={p.club} size={16} />
                  <span className="truncate text-[11px] text-muted-foreground">{clubs[p.club]?.name}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">
                  {p.pos} • Age {p.age}
                </p>
              </div>
              <WatchlistButton name={p.name} />
            </div>
            <div className="mt-3 flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] tracking-wide text-muted-foreground uppercase">Market value</p>
                <p className="text-xl font-black tabular-nums">{p.value}</p>
              </div>
              <TrendPill value={p.delta} />
            </div>
            <Sparkline data={p.spark || []} tone={p.delta >= 0 ? "primary" : "destructive"} />
          </article>
        ))}
      </div>
    </div>
  );
}

export function BiggestTransfers() {
  const max = Math.max(...biggestTransfers.map((t) => t.amount));
  return (
    <div className="panel">
      <PanelHeader
        title="Biggest Transfers (All Time)"
        subtitle="Record fees paid"
        action="View full list"
        icon={Trophy}
      />
      <ul className="divide-y divide-border/60">
        {biggestTransfers.map((t, i) => (
          <li
            key={t.name}
            className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary/40 sm:px-5"
          >
            <span className="w-5 text-center text-xs font-black text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <p className="truncate text-sm font-semibold">{t.name}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">{t.year}</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                <Crest id={t.from} size={16} />
                <MoveRight className="h-3 w-3 text-muted-foreground" />
                <Crest id={t.to} size={16} />
              </div>
              <ProgressBar value={(t.amount / max) * 100} className="mt-2" />
            </div>
            <p className="text-sm font-bold tabular-nums">{t.fee}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
