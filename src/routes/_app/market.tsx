import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp, TrendingDown, DollarSign, LineChart, Sparkles } from "lucide-react";
import { allPlayers, marketTrend, clubs } from "@/data/market";
import { PlayerAvatar, Crest } from "@/components/ftm/primitives";
import { cn } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const Route = createFileRoute("/_app/market")({
  head: () => ({
    meta: [
      { title: "Market Values & Valuation Trends — FTM" },
      { name: "description", content: "Analyze player valuation statistics, top gainers, market drops, and historical trends." },
    ],
  }),
  component: MarketPage,
});

export function MarketPage() {
  const [timeframe, setTimeframe] = useState<"7D" | "30D" | "90D" | "1Y">("30D");

  const topGainers = useMemo(() => {
    return [...allPlayers].sort((a, b) => b.delta - a.delta).slice(0, 5);
  }, []);

  const topDecliners = useMemo(() => {
    return [...allPlayers].sort((a, b) => a.delta - b.delta).slice(0, 5);
  }, []);

  const chartData = marketTrend[timeframe] || marketTrend["30D"];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Market Values & Analytics</h1>
          <p className="text-sm text-muted-foreground">
            Global player valuation statistics, top value gainers, market dips, and historical volume trends
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card p-1 text-xs">
          {(["7D", "30D", "90D", "1Y"] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={cn(
                "rounded px-3 py-1 font-bold transition-colors",
                timeframe === tf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="panel p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold">Total Transfer Market Capitalization</h3>
            <p className="text-xs text-muted-foreground">Index calculated from top 500 world players (€ Billions)</p>
          </div>
          <span className="text-xl font-black text-primary">€5.42B</span>
        </div>

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="marketGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="oklch(0.82 0.23 143)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="oklch(0.82 0.23 143)" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="label" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#191a21", borderColor: "#333", borderRadius: "8px", fontSize: "12px" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="oklch(0.82 0.23 143)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#marketGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gainers & Decliners Side by Side */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Top Gainers */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-emerald-400" />
            <h3 className="text-base font-bold">Top Market Value Gainers</h3>
          </div>
          <div className="space-y-3">
            {topGainers.map((player) => (
              <div key={player.id} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
                <div className="flex items-center gap-3">
                  <PlayerAvatar name={player.name} size={36} />
                  <div>
                    <p className="font-bold text-sm">{player.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Crest id={player.club} size={14} />
                      <span>{clubs[player.club]?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-sm">{player.value}</p>
                  <p className="font-bold text-emerald-400">+{player.delta}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Decliners */}
        <div className="panel p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingDown className="h-5 w-5 text-rose-400" />
            <h3 className="text-base font-bold">Biggest Value Adjustments</h3>
          </div>
          <div className="space-y-3">
            {topDecliners.map((player) => (
              <div key={player.id} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
                <div className="flex items-center gap-3">
                  <PlayerAvatar name={player.name} size={36} />
                  <div>
                    <p className="font-bold text-sm">{player.name}</p>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      <Crest id={player.club} size={14} />
                      <span>{clubs[player.club]?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-sm">{player.value}</p>
                  <p className="font-bold text-rose-400">{player.delta}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
