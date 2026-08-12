import { useState } from "react";
import { Bot, LineChart, Sparkles, TrendingUp, Trophy, Wallet, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Crest, PanelHeader, PlayerAvatar, ProgressBar, TrendPill } from "./primitives";
import { marketTrend, topPlayers, clubs, leagueSpending } from "@/data/market";
import { cn } from "@/lib/utils";

export function TopPlayersPanel() {
  return (
    <div className="panel">
      <PanelHeader title="Top Players" subtitle="By market value" icon={Trophy} />
      <ul className="divide-y divide-border/60">
        {topPlayers.map((p) => (
          <li
            key={p.name}
            className="grid grid-cols-[auto_auto_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/40 sm:px-5"
          >
            <span
              className={cn(
                "grid h-6 w-6 shrink-0 place-items-center rounded-md text-[11px] font-black tabular-nums",
                p.rank === 1 ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground",
              )}
            >
              {p.rank}
            </span>
            <PlayerAvatar name={p.name} size={34} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{p.name}</p>
              <div className="mt-0.5 flex min-w-0 items-center gap-1.5">
                <Crest id={p.club} size={15} />
                <span className="truncate text-[11px] text-muted-foreground">
                  {p.pos} • {clubs[p.club]?.name}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold whitespace-nowrap tabular-nums">{p.value}</p>
              <TrendPill value={p.delta} className="mt-0.5" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ranges = ["7D", "30D", "90D", "1Y"] as const;

function AreaTrend({ data }: { data: { label: string; value: number }[] }) {
  const w = 300;
  const h = 130;
  const padY = 8;
  const max = Math.max(...data.map((d) => d.value), 8);
  const pts = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * w;
    const y = h - padY - (d.value / max) * (h - padY * 2);
    return [x, y] as const;
  });
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1];
  const last = pts[pts.length - 1];

  return (
    <div className="grid grid-cols-[34px_minmax(0,1fr)] gap-1">
      <div className="flex flex-col justify-between py-1 text-right text-[10px] text-muted-foreground tabular-nums">
        {[...yTicks].reverse().map((t) => (
          <span key={t}>€{Math.round(max * t)}B</span>
        ))}
      </div>
      <div className="min-w-0">
        <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="h-[130px] w-full">
          <defs>
            <linearGradient id="ftmArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {yTicks.map((t) => (
            <line
              key={t}
              x1="0"
              x2={w}
              y1={h - t * (h - padY * 2) - padY}
              y2={h - t * (h - padY * 2) - padY}
              stroke="var(--color-border)"
              strokeWidth="0.5"
            />
          ))}
          <path d={area} fill="url(#ftmArea)" />
          <path
            d={line}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            strokeLinejoin="round"
          />
          {last ? (
            <circle
              cx={last[0]}
              cy={last[1]}
              r="3"
              fill="var(--color-primary)"
              stroke="var(--color-background)"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ) : null}
        </svg>
        <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
          {data.map((d, i) => (
            <span key={`${d.label}-${i}`} className="truncate">
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function MarketTrends() {
  const [range, setRange] = useState<(typeof ranges)[number]>("7D");
  const data = marketTrend[range] ?? [];

  return (
    <div className="panel">
      <PanelHeader title="Market Trends" subtitle="Total market value" action="Analytics" icon={LineChart} />
      <div className="p-4 sm:p-5">
        <div className="inline-flex rounded-lg bg-secondary p-0.5">
          {ranges.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-semibold transition-all duration-200",
                r === range
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <AreaTrend data={data} />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-border/70 pt-4">
          <div className="min-w-0">
            <p className="truncate text-[11px] text-muted-foreground">Total Market Value</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black tabular-nums">€5.42B</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                <TrendingUp className="h-3 w-3" />
                +12.6%
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">vs last 7 days</p>
          </div>
          <div className="min-w-0">
            <p className="truncate text-[11px] text-muted-foreground">Total Transfers</p>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black tabular-nums">145</span>
              <span className="text-xs font-semibold text-primary">+8.3%</span>
            </div>
            <p className="text-[10px] text-muted-foreground">vs last 7 days</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TransferSpending() {
  const max = Math.max(...leagueSpending.map((l) => l.amount));
  return (
    <div className="panel">
      <PanelHeader title="Transfer Spending" subtitle="By league, this window" icon={Wallet} />
      <ul className="flex flex-col gap-3.5 p-4 sm:p-5">
        {leagueSpending.map((l) => (
          <li key={l.short}>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="truncate font-medium">{l.league}</span>
              <span className="shrink-0 font-bold tabular-nums">€{l.amount.toFixed(2)}B</span>
            </div>
            <ProgressBar value={(l.amount / max) * 100} className="mt-1.5" />
          </li>
        ))}
      </ul>
    </div>
  );
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function TransferWindow() {
  const [t] = useState({ days: 45, hours: 12, mins: 34, secs: 8 });
  const cells = [
    { v: pad(t.days), l: "Days" },
    { v: pad(t.hours), l: "Hours" },
    { v: pad(t.mins), l: "Mins" },
    { v: pad(t.secs), l: "Secs" },
  ];
  return (
    <div className="panel">
      <PanelHeader title="Transfer Window" subtitle="Summer 2025 closes in" />
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-4 gap-2 text-center">
          {cells.map((c) => (
            <div key={c.l} className="rounded-lg border border-border/70 bg-surface/60 py-2.5">
              <p className="text-xl font-black tabular-nums sm:text-2xl">{c.v}</p>
              <p className="text-[10px] tracking-wide text-muted-foreground uppercase">{c.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AiAnalystCard() {
  return (
    <div className="bg-gradient-ai relative overflow-hidden rounded-xl border border-violet/30 p-5 shadow-[var(--shadow-panel)]">
      <div className="pointer-events-none absolute -top-16 -right-10 h-44 w-44 rounded-full bg-violet/25 blur-3xl" />
      <Bot className="pointer-events-none absolute -right-5 -bottom-7 h-36 w-36 text-foreground/10" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-foreground/10">
            <Sparkles className="h-4 w-4 text-primary" />
          </span>
          <h2 className="text-[13px] font-black tracking-[0.1em] uppercase">AI Transfer Analyst</h2>
        </div>
        <p className="mt-2 max-w-[85%] text-xs leading-relaxed text-foreground/70">
          Evaluate transfers, player value and squad fit with AI-powered analysis.
        </p>
        <Link
          to="/ai-analyst"
          className="group mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          Ask AI Analyst
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
