import { createFileRoute } from "@tanstack/react-router";
import { BarChart3, PieChart as PieIcon, DollarSign, Award, TrendingUp } from "lucide-react";
import { leagueSpending, biggestTransfers, clubs } from "@/data/market";
import { Crest } from "@/components/ftm/primitives";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const Route = createFileRoute("/_app/analytics")({
  head: () => ({
    meta: [
      { title: "Transfer Analytics & League Spending — FTM" },
      { name: "description", content: "In-depth analytical breakdown of league transfer budgets, record fees, and spending trends." },
    ],
  }),
  component: AnalyticsPage,
});

export function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Transfer Analytics Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Financial breakdowns, league-level net spending comparisons, and record-breaking transfer history
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Total Window Spending</p>
            <p className="mt-1 text-2xl font-black text-primary">€6.14B</p>
            <p className="mt-1 text-[10px] text-emerald-400 font-bold">+12% vs last summer</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Avg. Transfer Fee</p>
            <p className="mt-1 text-2xl font-black text-foreground">€28.4M</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Across top 5 leagues</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 text-sky-400">
            <BarChart3 className="h-5 w-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Most Active League</p>
            <p className="mt-1 text-2xl font-black text-foreground">Premier League</p>
            <p className="mt-1 text-[10px] text-emerald-400 font-bold">€2.41B spent</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
            <Award className="h-5 w-5" />
          </div>
        </div>

        <div className="panel p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-semibold">Highest Fee This Window</p>
            <p className="mt-1 text-2xl font-black text-primary">€125M</p>
            <p className="mt-1 text-[10px] text-muted-foreground">Florian Wirtz (LIV)</p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-purple-500/10 text-purple-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="panel p-5">
        <h3 className="text-base font-bold mb-1">League Transfer Expenditure Comparison (€ Billions)</h3>
        <p className="text-xs text-muted-foreground mb-4">Total money invested in incoming player purchases by league</p>

        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leagueSpending} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <XAxis dataKey="short" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#191a21", borderColor: "#333", borderRadius: "8px", fontSize: "12px" }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {leagueSpending.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "oklch(0.82 0.23 143)" : "oklch(0.35 0.08 240)"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Record Transfers Table */}
      <div className="panel p-5">
        <h3 className="text-base font-bold mb-4">All-Time Most Expensive Football Transfers</h3>
        <div className="space-y-3">
          {biggestTransfers.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between rounded-xl bg-secondary/30 p-3 text-xs">
              <div className="flex items-center gap-3">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary font-black text-xs">
                  #{idx + 1}
                </span>
                <div>
                  <p className="font-extrabold text-sm">{item.name}</p>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Crest id={item.from} size={14} />
                    <span>{clubs[item.from]?.name || item.from}</span>
                    <span>→</span>
                    <Crest id={item.to} size={14} />
                    <span>{clubs[item.to]?.name || item.to}</span>
                    <span>({item.year})</span>
                  </div>
                </div>
              </div>
              <span className="text-base font-black text-primary">{item.fee}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
