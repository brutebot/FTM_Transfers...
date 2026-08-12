import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/ftm/hero";
import {
  LatestTransfers,
  HotRumours,
  LiveNegotiations,
  FeaturedPlayers,
  BiggestTransfers,
} from "@/components/ftm/panels";
import {
  TopPlayersPanel,
  MarketTrends,
  TransferSpending,
  TransferWindow,
  AiAnalystCard,
} from "@/components/ftm/aside-panels";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "FTM — Live Football Transfer Market & Analytics" },
      {
        name: "description",
        content:
          "Track live football transfers, rumours, negotiations and player market values with premium analytics on FTM Transfer Market.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="grid min-w-0 gap-4 md:gap-5 xl:grid-cols-[minmax(0,1fr)_368px]">
      <div className="flex min-w-0 flex-col gap-4 md:gap-5">
        <Hero />
        <div className="grid gap-4 md:gap-5 lg:grid-cols-2 2xl:grid-cols-3">
          <LatestTransfers />
          <HotRumours />
          <div className="lg:col-span-2 2xl:col-span-1">
            <LiveNegotiations />
          </div>
        </div>
        <FeaturedPlayers />
        <BiggestTransfers />
      </div>

      <aside className="flex min-w-0 flex-col gap-4 md:gap-5">
        <TopPlayersPanel />
        <MarketTrends />
        <TransferSpending />
        <TransferWindow />
        <AiAnalystCard />
      </aside>
    </div>
  );
}
