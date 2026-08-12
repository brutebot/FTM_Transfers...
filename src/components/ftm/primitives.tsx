import { useState } from "react";
import { Star, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { clubs, playerPhotos } from "@/data/market";

export function Crest({ id, size = 22 }: { id: string; size?: number }) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const club = clubs[id];
  if (!club) return null;

  const showLogo = Boolean(club.logo) && !imgError;

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full text-[9px] font-bold tracking-tight overflow-hidden transition-transform duration-200 hover:scale-110"
      style={{
        width: size,
        height: size,
        backgroundColor: `${club.color}22`,
        color: club.color,
        border: `1px solid ${club.color}55`,
      }}
      title={club.name}
    >
      <span>{club.short}</span>
      {showLogo && (
        <img
          src={club.logo}
          alt=""
          width={size}
          height={size}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-contain p-0.5 transition-opacity duration-200",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </span>
  );
}

const AVATAR_HUES = [143, 200, 260, 30, 350, 90, 300, 55];

export function PlayerAvatar({
  name,
  size = 36,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const photo = playerPhotos[name];

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const hue = AVATAR_HUES[name.length % AVATAR_HUES.length];

  const showPhoto = Boolean(photo) && !imgError;

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-semibold overflow-hidden border border-border/80 shadow-sm transition-transform duration-200 hover:scale-105",
        className
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        background: `linear-gradient(145deg, oklch(0.42 0.09 ${hue}), oklch(0.24 0.05 ${hue}))`,
        color: `oklch(0.93 0.06 ${hue})`,
      }}
      title={name}
    >
      <span>{initials}</span>

      {showPhoto && (
        <img
          src={photo}
          alt=""
          width={size}
          height={size}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setImgError(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-200",
            loaded ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
}

export function PanelHeader({
  title,
  subtitle,
  action,
  onAction,
  icon: Icon,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  onAction?: () => void;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3.5 sm:px-5">
      <div className="flex min-w-0 items-center gap-2.5">
        {Icon ? (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <Icon className="h-3.5 w-3.5" />
          </span>
        ) : null}
        <div className="min-w-0">
          <h2 className="truncate text-[13px] font-bold tracking-[0.08em] uppercase">{title}</h2>
          {subtitle ? (
            <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
      </div>
      {action ? (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-primary transition-colors hover:bg-accent"
        >
          {action}
        </button>
      ) : null}
    </div>
  );
}

export function TrendPill({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  const Icon = up ? TrendingUp : TrendingDown;
  return (
    <span
      title={`${up ? "Up" : "Down"} ${Math.abs(value)}% over 30 days`}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
        up ? "bg-primary/12 text-primary" : "bg-destructive/15 text-destructive",
        className,
      )}
    >
      <Icon className="h-3 w-3" />
      {up ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export function ProgressBar({
  value,
  tone = "primary",
  className,
}: {
  value: number;
  tone?: "primary" | "warning" | "info" | "destructive";
  className?: string;
}) {
  const toneClass = {
    primary: "bg-primary",
    warning: "bg-warning",
    info: "bg-info",
    destructive: "bg-destructive",
  }[tone];
  return (
    <div
      className={cn("h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-700 ease-out", toneClass)}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "Confirmed"
      ? "border-primary/40 bg-primary/10 text-primary"
      : status === "Medical" || status === "Agreed"
        ? "border-info/40 bg-info/10 text-info"
        : status === "Negotiating" || status === "Offer Made"
          ? "border-warning/40 bg-warning/10 text-warning"
          : "border-destructive/40 bg-destructive/10 text-destructive";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wide whitespace-nowrap uppercase",
        tone,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function WatchlistButton({ name }: { name: string }) {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      title={on ? `Remove ${name} from watchlist` : `Add ${name} to watchlist`}
      aria-pressed={on}
      aria-label={on ? `Remove ${name} from watchlist` : `Add ${name} to watchlist`}
      className={cn(
        "grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-all duration-200 active:scale-90",
        on
          ? "border-primary/50 bg-primary/15 text-primary"
          : "border-border text-muted-foreground hover:border-primary/40 hover:text-primary",
      )}
    >
      <Star className={cn("h-3.5 w-3.5", on && "fill-current")} />
    </button>
  );
}

export function Sparkline({
  data = [],
  width = 120,
  height = 28,
  tone = "primary",
}: {
  data?: number[];
  width?: number;
  height?: number;
  tone?: "primary" | "destructive";
}) {
  if (!data || data.length < 2) {
    return <div style={{ height }} className="h-7 w-full rounded bg-muted/20" />;
  }
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / span) * (height - 4) - 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const stroke = tone === "primary" ? "var(--color-primary)" : "var(--color-destructive)";
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-7 w-full" preserveAspectRatio="none" aria-hidden="true">
      <polyline
        points={`0,${height} ${pts.join(" ")} ${width},${height}`}
        fill={stroke}
        fillOpacity="0.1"
        stroke="none"
      />
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted/70", className)} />;
}
