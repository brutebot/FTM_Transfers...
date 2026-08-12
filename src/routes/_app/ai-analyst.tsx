import { useState, useRef, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bot, Send, Sparkles, User, HelpCircle, RefreshCw } from "lucide-react";
import { allPlayers, clubs, latestTransfers, hotRumours } from "@/data/market";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/ai-analyst")({
  head: () => ({
    meta: [
      { title: "AI Analyst — FTM Transfer Market Intelligence" },
      { name: "description", content: "Ask AI questions about player market values, scout transfer targets, and compare players." },
    ],
  }),
  component: AiAnalystPage,
});

type Message = {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
};

const SUGGESTIONS = [
  "Which striker should Chelsea sign?",
  "Analyze Florian Wirtz's transfer value.",
  "Compare Jude Bellingham vs Pedri.",
  "Which clubs need a defensive midfielder?",
  "Suggest realistic transfer targets for Man Utd.",
];

export function AiAnalystPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Hello! I am your AI Transfer Analyst. I have access to real-time player market valuations, club transfer budgets, and historical deal metrics. How can I assist your squad analysis today?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const generateAnswer = (userPrompt: string): string => {
    const p = userPrompt.toLowerCase();

    if (p.includes("striker") || p.includes("st") || p.includes("forward")) {
      const topStrikers = allPlayers.filter((x) => x.pos === "ST").map((x) => `${x.name} (${x.value}, ${clubs[x.club]?.name})`).join(", ");
      return `Based on our current database, prime striker targets include: ${topStrikers}. For clubs seeking high clinical output, Victor Osimhen (€90M) or Benjamin Šeško (€65M) offer the best physical and tactical fit for top-tier pressing systems.`;
    }

    if (p.includes("wirtz")) {
      const wirtz = allPlayers.find((x) => x.id === "wirtz");
      return `Florian Wirtz is currently valued at ${wirtz?.value || "€130M"} with a +14.5% value acceleration over the last season. His latest confirmed move from Bayer Leverkusen to Liverpool for €125M represents one of the highest fee valuations of 2026 due to his 18 goals and 19 assists.`;
    }

    if (p.includes("bellingham") && p.includes("pedri")) {
      return `Player Comparison Breakdown:\n\n• Jude Bellingham (CM/CAM, Real Madrid): Market Value €160M, 19 Goals, 10 Assists. High box-to-box presence, aerial threat, and elite physical duels.\n• Pedri (CM, Barcelona): Market Value €110M, 4 Goals, 6 Assists. Elite press resistance, tempo control, and progressive pass completion rate (92.4%).`;
    }

    if (p.includes("defensive midfielder") || p.includes("cdm")) {
      return `Clubs actively searching for elite CDMs include Arsenal and Man Utd. Top targets on the market include Martín Zubimendi (€60M, agreed with Arsenal), João Neves (€60M, PSG), and Joshua Kimmich (€60M, Bayern).`;
    }

    if (p.includes("man utd") || p.includes("manchester united")) {
      return `For Manchester United, under Rúben Amorim, priority target profiles include a physical center-back (Leny Yoro already confirmed for €62M) and a dynamic press-resistant central midfielder like João Neves or Bruno Fernandes depth options.`;
    }

    // Default intelligent response using database snapshot
    const count = allPlayers.length;
    const totalVal = allPlayers.reduce((acc, curr) => acc + curr.numericValue, 0);
    return `Analysis based on ${count} top-tier players (€${totalVal}M total value analyzed):\n\nRegarding "${userPrompt}": Current transfer trends indicate clubs are prioritizing young midfielders with high press-resistance and strikers with direct line-breaking speed. Check our Rumours section for live reliability updates!`;
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    setTimeout(() => {
      const aiReplyText = generateAnswer(query);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight">AI Transfer Analyst</h1>
            <span className="rounded-full bg-purple-500/10 border border-purple-500/30 px-2.5 py-0.5 text-[10px] font-bold text-purple-400">
              PRO INTELLIGENCE
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Ask complex market questions, compare player valuations, or scout squad recommendations
          </p>
        </div>
      </div>

      {/* Chat Box */}
      <div className="panel flex-1 flex flex-col min-h-0 overflow-hidden bg-card">
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3 max-w-[85%]",
                msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold shadow-sm",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-purple-600 text-white"
                )}
              >
                {msg.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line shadow-sm",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground font-medium rounded-tr-none"
                    : "bg-secondary/70 border border-border text-foreground rounded-tl-none"
                )}
              >
                {msg.text}
                <div
                  className={cn(
                    "mt-1 text-[10px] text-right opacity-70",
                    msg.sender === "user" ? "text-primary-foreground" : "text-muted-foreground"
                  )}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 mr-auto">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-white">
                <Bot className="h-4 w-4 animate-bounce" />
              </div>
              <div className="rounded-2xl rounded-tl-none bg-secondary/70 border border-border px-4 py-3 text-xs text-muted-foreground flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-400" />
                Analyzing football market data...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Suggestions */}
        <div className="px-4 py-2 border-t border-border/50 bg-background/50 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <Sparkles className="h-3.5 w-3.5 text-purple-400 shrink-0" />
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(s)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:border-purple-500/50 hover:text-foreground transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-border bg-card flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask AI Analyst anything about players, clubs, or transfer values..."
            className="flex-1 h-10 rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
          />
          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            className="grid h-10 w-10 place-items-center rounded-xl bg-purple-600 text-white transition-all hover:bg-purple-500 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
