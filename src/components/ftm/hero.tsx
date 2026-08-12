import { Search, ArrowRight, Radio } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImage from "@/assets/hero-players.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-panel)]">
      <img
        src={heroImage}
        alt="Professional footballers featured in the transfer market"
        width={1536}
        height={640}
        className="absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-90 sm:w-[74%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/95 to-card/10 sm:via-card/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />
      <div className="pointer-events-none absolute -top-24 -left-16 h-64 w-64 rounded-full bg-primary/12 blur-3xl" />

      <div className="relative flex flex-col items-start gap-5 px-6 py-10 sm:px-10 sm:py-14 lg:max-w-[60%]">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-primary uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
          Summer window open • 45 days left
        </span>

        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-foreground/70 uppercase">The world of</p>
          <h1 className="mt-1.5 text-4xl leading-[0.92] font-black tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-gradient-accent block">FOOTBALL</span>
            <span className="block italic">TRANSFERS</span>
          </h1>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Live transfer intelligence, verified negotiations and market-value analytics for every
          major league — in one professional dashboard.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/market"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-all duration-200 hover:opacity-90 active:scale-95"
          >
            Explore Market
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/players"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/80 px-5 py-2.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-primary/40 hover:bg-secondary active:scale-95"
          >
            Advanced Search
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <dl className="grid grid-cols-3 gap-4 pt-2 sm:gap-8">
          {[
            { k: "Live deals", v: "145" },
            { k: "Market value", v: "€5.42B" },
            { k: "Clubs tracked", v: "320" },
          ].map((s) => (
            <div key={s.k} className="min-w-0">
              <dt className="flex items-center gap-1 truncate text-[10px] tracking-wide text-muted-foreground uppercase">
                <Radio className="h-2.5 w-2.5 shrink-0 text-primary" />
                {s.k}
              </dt>
              <dd className="text-lg font-black tabular-nums sm:text-xl">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
