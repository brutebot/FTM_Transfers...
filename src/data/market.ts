export type Club = {
  id: string;
  name: string;
  short: string;
  color: string;
  logo: string;
  league: string;
  country: string;
  stadium: string;
  manager: string;
  budget: string;
  squadSize: number;
};

export const clubs: Record<string, Club> = {
  mancity: { id: "mancity", name: "Man City", short: "MCI", color: "#6CABDD", logo: "https://resources.premierleague.com/premierleague/badges/50/t43.png", league: "Premier League", country: "England", stadium: "Etihad Stadium", manager: "Pep Guardiola", budget: "€250M", squadSize: 24 },
  manutd: { id: "manutd", name: "Man Utd", short: "MUN", color: "#DA291C", logo: "https://resources.premierleague.com/premierleague/badges/50/t1.png", league: "Premier League", country: "England", stadium: "Old Trafford", manager: "Rúben Amorim", budget: "€180M", squadSize: 26 },
  realmadrid: { id: "realmadrid", name: "Real Madrid", short: "RMA", color: "#FEBE10", logo: "https://cdn.sofifa.net/teams/243/60.png", league: "La Liga", country: "Spain", stadium: "Santiago Bernabéu", manager: "Carlo Ancelotti", budget: "€220M", squadSize: 23 },
  arsenal: { id: "arsenal", name: "Arsenal", short: "ARS", color: "#EF0107", logo: "https://resources.premierleague.com/premierleague/badges/50/t3.png", league: "Premier League", country: "England", stadium: "Emirates Stadium", manager: "Mikel Arteta", budget: "€160M", squadSize: 25 },
  barcelona: { id: "barcelona", name: "Barcelona", short: "BAR", color: "#A50044", logo: "https://cdn.sofifa.net/teams/241/60.png", league: "La Liga", country: "Spain", stadium: "Camp Nou", manager: "Hansi Flick", budget: "€110M", squadSize: 25 },
  liverpool: { id: "liverpool", name: "Liverpool", short: "LIV", color: "#C8102E", logo: "https://resources.premierleague.com/premierleague/badges/50/t14.png", league: "Premier League", country: "England", stadium: "Anfield", manager: "Arne Slot", budget: "€175M", squadSize: 24 },
  leverkusen: { id: "leverkusen", name: "Leverkusen", short: "B04", color: "#E32221", logo: "https://cdn.sofifa.net/teams/481/60.png", league: "Bundesliga", country: "Germany", stadium: "BayArena", manager: "Xabi Alonso", budget: "€95M", squadSize: 24 },
  wolves: { id: "wolves", name: "Wolves", short: "WOL", color: "#FDB913", logo: "https://resources.premierleague.com/premierleague/badges/50/t39.png", league: "Premier League", country: "England", stadium: "Molineux", manager: "Gary O'Neil", budget: "€45M", squadSize: 25 },
  lille: { id: "lille", name: "Lille", short: "LIL", color: "#E01E13", logo: "https://cdn.sofifa.net/teams/461/60.png", league: "Ligue 1", country: "France", stadium: "Stade Pierre-Mauroy", manager: "Bruno Génésio", budget: "€40M", squadSize: 26 },
  chelsea: { id: "chelsea", name: "Chelsea", short: "CHE", color: "#034694", logo: "https://resources.premierleague.com/premierleague/badges/50/t8.png", league: "Premier League", country: "England", stadium: "Stamford Bridge", manager: "Enzo Maresca", budget: "€200M", squadSize: 30 },
  napoli: { id: "napoli", name: "Napoli", short: "NAP", color: "#12A0D7", logo: "https://cdn.sofifa.net/teams/48/60.png", league: "Serie A", country: "Italy", stadium: "Diego Armando Maradona", manager: "Antonio Conte", budget: "€85M", squadSize: 25 },
  alhilal: { id: "alhilal", name: "Al Hilal", short: "HIL", color: "#1D4E9B", logo: "https://cdn.sofifa.net/teams/605/60.png", league: "Saudi Pro League", country: "Saudi Arabia", stadium: "Kingdom Arena", manager: "Jorge Jesus", budget: "€300M", squadSize: 28 },
  acmilan: { id: "acmilan", name: "AC Milan", short: "MIL", color: "#FB090B", logo: "https://cdn.sofifa.net/teams/47/60.png", league: "Serie A", country: "Italy", stadium: "San Siro", manager: "Paulo Fonseca", budget: "€90M", squadSize: 26 },
  psg: { id: "psg", name: "PSG", short: "PSG", color: "#004170", logo: "https://cdn.sofifa.net/teams/73/60.png", league: "Ligue 1", country: "France", stadium: "Parc des Princes", manager: "Luis Enrique", budget: "€280M", squadSize: 24 },
  leipzig: { id: "leipzig", name: "RB Leipzig", short: "RBL", color: "#DD0741", logo: "https://cdn.sofifa.net/teams/112558/60.png", league: "Bundesliga", country: "Germany", stadium: "Red Bull Arena", manager: "Marco Rose", budget: "€90M", squadSize: 25 },
  everton: { id: "everton", name: "Everton", short: "EVE", color: "#003399", logo: "https://resources.premierleague.com/premierleague/badges/50/t11.png", league: "Premier League", country: "England", stadium: "Goodison Park", manager: "Sean Dyche", budget: "€35M", squadSize: 24 },
  bayern: { id: "bayern", name: "Bayern", short: "FCB", color: "#DC052D", logo: "https://cdn.sofifa.net/teams/21/60.png", league: "Bundesliga", country: "Germany", stadium: "Allianz Arena", manager: "Vincent Kompany", budget: "€210M", squadSize: 24 },
  inter: { id: "inter", name: "Inter", short: "INT", color: "#0068A8", logo: "https://cdn.sofifa.net/teams/44/60.png", league: "Serie A", country: "Italy", stadium: "San Siro", manager: "Simone Inzaghi", budget: "€95M", squadSize: 25 },
  girona: { id: "girona", name: "Girona", short: "GIR", color: "#CD2534", logo: "https://cdn.sofifa.net/teams/112172/60.png", league: "La Liga", country: "Spain", stadium: "Montilivi", manager: "Míchel", budget: "€50M", squadSize: 24 },
  juventus: { id: "juventus", name: "Juventus", short: "JUV", color: "#B4B4B4", logo: "https://cdn.sofifa.net/teams/45/60.png", league: "Serie A", country: "Italy", stadium: "Allianz Stadium", manager: "Thiago Motta", budget: "€120M", squadSize: 25 },
  monaco: { id: "monaco", name: "Monaco", short: "ASM", color: "#E63329", logo: "https://cdn.sofifa.net/teams/69/60.png", league: "Ligue 1", country: "France", stadium: "Stade Louis II", manager: "Adi Hütter", budget: "€75M", squadSize: 25 },
  benfica: { id: "benfica", name: "Benfica", short: "SLB", color: "#E00034", logo: "https://cdn.sofifa.net/teams/234/60.png", league: "Primeira Liga", country: "Portugal", stadium: "Estádio da Luz", manager: "Bruno Lage", budget: "€70M", squadSize: 26 },
  atletico: { id: "atletico", name: "Atlético", short: "ATM", color: "#CB3524", logo: "https://cdn.sofifa.net/teams/240/60.png", league: "La Liga", country: "Spain", stadium: "Cívitas Metropolitano", manager: "Diego Simeone", budget: "€130M", squadSize: 24 },
};

export const playerPhotos: Record<string, string> = {
  "Erling Haaland": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223094.png",
  "Jude Bellingham": "https://cdn.sofifa.net/players/252/371/24_120.png",
  "Vinícius Jr.": "https://cdn.sofifa.net/players/238/794/24_120.png",
  "Bukayo Saka": "https://resources.premierleague.com/premierleague/photos/players/250x250/p223340.png",
  "Pedri": "https://cdn.sofifa.net/players/251/854/24_120.png",
  "Florian Wirtz": "https://cdn.sofifa.net/players/256/630/24_120.png",
  "Matheus Cunha": "https://resources.premierleague.com/premierleague/photos/players/250x250/p430871.png",
  "Leny Yoro": "https://resources.premierleague.com/premierleague/photos/players/250x250/p588526.png",
  "Martín Zubimendi": "https://cdn.sofifa.net/players/241/464/24_120.png",
  "Victor Osimhen": "https://cdn.sofifa.net/players/232/293/24_120.png",
  "Bruno Fernandes": "https://resources.premierleague.com/premierleague/photos/players/250x250/p141746.png",
  "Rafael Leão": "https://cdn.sofifa.net/players/241/084/24_120.png",
  "Nico Williams": "https://cdn.sofifa.net/players/256/808/24_120.png",
  "João Neves": "https://cdn.sofifa.net/players/269/402/24_120.png",
  "Benjamin Šeško": "https://cdn.sofifa.net/players/253/437/24_120.png",
  "Jarrad Branthwaite": "https://resources.premierleague.com/premierleague/photos/players/250x250/p463748.png",
  "Joshua Kimmich": "https://cdn.sofifa.net/players/212/622/24_120.png",
  "Lautaro Martínez": "https://cdn.sofifa.net/players/231/478/24_120.png",
  "Miguel Gutiérrez": "https://cdn.sofifa.net/players/253/149/24_120.png",
  "Dusan Vlahovic": "https://cdn.sofifa.net/players/246/430/24_120.png",
  "Bernardo Silva": "https://resources.premierleague.com/premierleague/photos/players/250x250/p165809.png",
  "Neymar": "https://cdn.sofifa.net/players/190/871/24_120.png",
  "Kylian Mbappé": "https://cdn.sofifa.net/players/231/747/24_120.png",
  "Philippe Coutinho": "https://resources.premierleague.com/premierleague/photos/players/250x250/p80444.png",
  "João Félix": "https://resources.premierleague.com/premierleague/photos/players/250x250/p433154.png",
  "Antoine Griezmann": "https://cdn.sofifa.net/players/194/765/24_120.png",
  "Rodri": "https://resources.premierleague.com/premierleague/photos/players/250x250/p220566.png",
  "Lamine Yamal": "https://cdn.sofifa.net/players/277/643/24_120.png",
  "Cole Palmer": "https://resources.premierleague.com/premierleague/photos/players/250x250/p244851.png",
  "Phil Foden": "https://resources.premierleague.com/premierleague/photos/players/250x250/p209244.png",
};

export type PlayerDetails = {
  id: string;
  name: string;
  pos: string;
  club: string;
  age: number;
  nationality: string;
  value: string;
  numericValue: number; // in Millions EUR
  delta: number;
  matches: number;
  goals: number;
  assists: number;
  rating: number;
  contractUntil: string;
  spark?: number[];
};

export const allPlayers: PlayerDetails[] = [
  { id: "haaland", name: "Erling Haaland", pos: "ST", club: "mancity", age: 24, nationality: "Norway", value: "€180M", numericValue: 180, delta: 4.2, matches: 31, goals: 27, assists: 5, rating: 8.4, contractUntil: "2027", spark: [140, 150, 160, 170, 175, 180] },
  { id: "bellingham", name: "Jude Bellingham", pos: "CM", club: "realmadrid", age: 21, nationality: "England", value: "€160M", numericValue: 160, delta: 2.8, matches: 28, goals: 19, assists: 10, rating: 8.6, contractUntil: "2029", spark: [90, 120, 140, 150, 155, 160] },
  { id: "vinicius", name: "Vinícius Jr.", pos: "LW", club: "realmadrid", age: 24, nationality: "Brazil", value: "€150M", numericValue: 150, delta: -1.4, matches: 26, goals: 15, assists: 9, rating: 8.3, contractUntil: "2027", spark: [120, 135, 150, 152, 151, 150] },
  { id: "mbappe", name: "Kylian Mbappé", pos: "ST", club: "realmadrid", age: 25, nationality: "France", value: "€180M", numericValue: 180, delta: 5.0, matches: 29, goals: 24, assists: 8, rating: 8.5, contractUntil: "2029", spark: [160, 170, 175, 180] },
  { id: "saka", name: "Bukayo Saka", pos: "RW", club: "arsenal", age: 23, nationality: "England", value: "€120M", numericValue: 120, delta: 3.1, matches: 33, goals: 16, assists: 13, rating: 8.1, contractUntil: "2027", spark: [90, 100, 110, 115, 120] },
  { id: "foden", name: "Phil Foden", pos: "CAM", club: "mancity", age: 24, nationality: "England", value: "€130M", numericValue: 130, delta: 7.5, matches: 35, goals: 19, assists: 8, rating: 8.2, contractUntil: "2027", spark: [100, 110, 120, 130] },
  { id: "yamal", name: "Lamine Yamal", pos: "RW", club: "barcelona", age: 17, nationality: "Spain", value: "€150M", numericValue: 150, delta: 25.0, matches: 37, goals: 10, assists: 14, rating: 8.4, contractUntil: "2026", spark: [50, 75, 100, 120, 150] },
  { id: "palmer", name: "Cole Palmer", pos: "CAM", club: "chelsea", age: 22, nationality: "England", value: "€90M", numericValue: 90, delta: 18.2, matches: 34, goals: 22, assists: 11, rating: 8.3, contractUntil: "2030", spark: [30, 50, 70, 80, 90] },
  { id: "rodri", name: "Rodri", pos: "CDM", club: "mancity", age: 28, nationality: "Spain", value: "€130M", numericValue: 130, delta: 2.1, matches: 34, goals: 8, assists: 9, rating: 8.7, contractUntil: "2027", spark: [110, 120, 125, 130] },
  { id: "pedri", name: "Pedri", pos: "CM", club: "barcelona", age: 22, nationality: "Spain", value: "€110M", numericValue: 110, delta: 0.9, matches: 24, goals: 4, assists: 6, rating: 8.0, contractUntil: "2026", spark: [90, 100, 105, 110] },
  { id: "wirtz", name: "Florian Wirtz", pos: "CAM", club: "leverkusen", age: 21, nationality: "Germany", value: "€130M", numericValue: 130, delta: 14.5, matches: 32, goals: 18, assists: 19, rating: 8.5, contractUntil: "2027", spark: [80, 100, 115, 130] },
  { id: "cunha", name: "Matheus Cunha", pos: "ST", club: "wolves", age: 25, nationality: "Brazil", value: "€65M", numericValue: 65, delta: 8.3, matches: 32, goals: 14, assists: 7, rating: 7.7, contractUntil: "2027", spark: [40, 48, 55, 65] },
  { id: "yoro", name: "Leny Yoro", pos: "CB", club: "manutd", age: 19, nationality: "France", value: "€62M", numericValue: 62, delta: 15.0, matches: 30, goals: 2, assists: 0, rating: 7.6, contractUntil: "2029", spark: [25, 40, 50, 62] },
  { id: "zubimendi", name: "Martín Zubimendi", pos: "CDM", club: "arsenal", age: 26, nationality: "Spain", value: "€60M", numericValue: 60, delta: 4.1, matches: 31, goals: 4, assists: 3, rating: 7.8, contractUntil: "2028", spark: [45, 50, 55, 60] },
  { id: "osimhen", name: "Victor Osimhen", pos: "ST", club: "napoli", age: 26, nationality: "Nigeria", value: "€90M", numericValue: 90, delta: -5.2, matches: 25, goals: 17, assists: 4, rating: 8.0, contractUntil: "2026", spark: [120, 110, 95, 90] },
  { id: "bruno", name: "Bruno Fernandes", pos: "CM", club: "manutd", age: 30, nationality: "Portugal", value: "€70M", numericValue: 70, delta: -2.0, matches: 35, goals: 10, assists: 8, rating: 7.9, contractUntil: "2027", spark: [85, 80, 75, 70] },
  { id: "leao", name: "Rafael Leão", pos: "LW", club: "acmilan", age: 25, nationality: "Portugal", value: "€85M", numericValue: 85, delta: 1.2, matches: 33, goals: 13, assists: 11, rating: 8.1, contractUntil: "2028", spark: [80, 82, 84, 85] },
  { id: "nico", name: "Nico Williams", pos: "LW", club: "girona", age: 22, nationality: "Spain", value: "€70M", numericValue: 70, delta: 12.0, matches: 31, goals: 8, assists: 16, rating: 8.2, contractUntil: "2027", spark: [40, 52, 62, 70] },
  { id: "joaoneves", name: "João Neves", pos: "CDM", club: "psg", age: 20, nationality: "Portugal", value: "€60M", numericValue: 60, delta: 18.0, matches: 29, goals: 3, assists: 6, rating: 7.8, contractUntil: "2029", spark: [20, 35, 48, 60] },
  { id: "sesko", name: "Benjamin Šeško", pos: "ST", club: "leipzig", age: 21, nationality: "Slovenia", value: "€65M", numericValue: 65, delta: 9.5, matches: 31, goals: 18, assists: 4, rating: 7.9, contractUntil: "2028", spark: [35, 45, 55, 65] },
  { id: "branthwaite", name: "Jarrad Branthwaite", pos: "CB", club: "everton", age: 22, nationality: "England", value: "€50M", numericValue: 50, delta: 6.2, matches: 35, goals: 3, assists: 1, rating: 7.6, contractUntil: "2027", spark: [20, 32, 42, 50] },
  { id: "kimmich", name: "Joshua Kimmich", pos: "CDM", club: "bayern", age: 30, nationality: "Germany", value: "€60M", numericValue: 60, delta: 6.4, matches: 30, goals: 2, assists: 8, rating: 8.1, contractUntil: "2025", spark: [75, 70, 62, 60] },
  { id: "lautaro", name: "Lautaro Martínez", pos: "ST", club: "inter", age: 27, nationality: "Argentina", value: "€110M", numericValue: 110, delta: 3.9, matches: 33, goals: 24, assists: 6, rating: 8.3, contractUntil: "2029", spark: [85, 95, 105, 110] },
  { id: "gutierrez", name: "Miguel Gutiérrez", pos: "LB", club: "girona", age: 23, nationality: "Spain", value: "€28M", numericValue: 28, delta: 11.2, matches: 34, goals: 2, assists: 7, rating: 7.5, contractUntil: "2027", spark: [12, 18, 22, 28] },
  { id: "vlahovic", name: "Dusan Vlahovic", pos: "ST", club: "juventus", age: 25, nationality: "Serbia", value: "€70M", numericValue: 70, delta: -4.1, matches: 31, goals: 16, assists: 4, rating: 7.7, contractUntil: "2026", spark: [85, 80, 74, 70] },
  { id: "bernardo", name: "Bernardo Silva", pos: "CM", club: "mancity", age: 30, nationality: "Portugal", value: "€60M", numericValue: 60, delta: 1.7, spark: [80, 75, 65, 60], matches: 31, goals: 7, assists: 9, rating: 8.1, contractUntil: "2026" },
];

export const topPlayers = allPlayers.slice(0, 5).map((p, idx) => ({
  rank: idx + 1,
  name: p.name,
  pos: p.pos,
  club: p.club,
  value: p.value,
  delta: p.delta,
}));

export const latestTransfers = [
  { id: "t1", name: "Florian Wirtz", pos: "CAM", from: "leverkusen", to: "liverpool", fee: "€125M", numericFee: 125, status: "Confirmed" as const, probability: 100, when: "2h ago", date: "2026-08-12" },
  { id: "t2", name: "Matheus Cunha", pos: "ST", from: "wolves", to: "manutd", fee: "€65M", numericFee: 65, status: "Medical" as const, probability: 95, when: "5h ago", date: "2026-08-12" },
  { id: "t3", name: "Leny Yoro", pos: "CB", from: "lille", to: "manutd", fee: "€62M", numericFee: 62, status: "Confirmed" as const, probability: 100, when: "1d ago", date: "2026-08-11" },
  { id: "t4", name: "Martín Zubimendi", pos: "CDM", from: "girona", to: "arsenal", fee: "€60M", numericFee: 60, status: "Agreed" as const, probability: 92, when: "1d ago", date: "2026-08-11" },
  { id: "t5", name: "Kylian Mbappé", pos: "ST", from: "psg", to: "realmadrid", fee: "Free Transfer", numericFee: 0, status: "Confirmed" as const, probability: 100, when: "3d ago", date: "2026-08-09" },
  { id: "t6", name: "João Neves", pos: "CDM", from: "benfica", to: "psg", fee: "€60M", numericFee: 60, status: "Confirmed" as const, probability: 100, when: "4d ago", date: "2026-08-08" },
];

export const hotRumours = [
  { id: "r1", name: "Victor Osimhen", pos: "ST", from: "napoli", to: "chelsea", chance: 78, fee: "€90M", reliability: "High", source: "Fabrizio Romano", date: "Today" },
  { id: "r2", name: "Bruno Fernandes", pos: "CM", from: "manutd", to: "alhilal", chance: 62, fee: "€70M", reliability: "Medium", source: "The Athletic", date: "Today" },
  { id: "r3", name: "Rafael Leão", pos: "LW", from: "acmilan", to: "barcelona", chance: 55, fee: "€85M", reliability: "Medium", source: "Sky Sports", date: "Yesterday" },
  { id: "r4", name: "Nico Williams", pos: "LW", from: "girona", to: "bayern", chance: 41, fee: "€58M", reliability: "Low", source: "Bild", date: "2 days ago" },
  { id: "r5", name: "Benjamin Šeško", pos: "ST", from: "leipzig", to: "arsenal", chance: 82, fee: "€65M", reliability: "High", source: "David Ornstein", date: "Today" },
  { id: "r6", name: "Joshua Kimmich", pos: "CDM", from: "bayern", to: "mancity", chance: 68, fee: "€50M", reliability: "Medium", source: "Kicker", date: "Yesterday" },
];

export const negotiations = [
  { name: "João Neves", pos: "CDM", from: "psg", to: "manutd", offer: "€55M", asking: "€75M", status: "Negotiating" as const, progress: 64 },
  { name: "Benjamin Šeško", pos: "ST", from: "leipzig", to: "arsenal", offer: "€68M", asking: "€80M", status: "Offer Made" as const, progress: 45 },
  { name: "Jarrad Branthwaite", pos: "CB", from: "everton", to: "manutd", offer: "€45M", asking: "€70M", status: "Stalled" as const, progress: 28 },
];

export const featuredPlayers = allPlayers.slice(15, 20);

export const biggestTransfers = [
  { name: "Neymar", year: 2017, fee: "€222M", amount: 222, from: "barcelona", to: "psg" },
  { name: "Kylian Mbappé", year: 2018, fee: "€180M", amount: 180, from: "monaco", to: "psg" },
  { name: "Philippe Coutinho", year: 2018, fee: "€135M", amount: 135, from: "liverpool", to: "barcelona" },
  { name: "João Félix", year: 2019, fee: "€127M", amount: 127, from: "benfica", to: "atletico" },
  { name: "Antoine Griezmann", year: 2019, fee: "€120M", amount: 120, from: "atletico", to: "barcelona" },
];

export const leagueSpending = [
  { league: "Premier League", short: "EPL", amount: 2.41 },
  { league: "Serie A", short: "SEA", amount: 1.12 },
  { league: "La Liga", short: "LAL", amount: 0.86 },
  { league: "Bundesliga", short: "BUN", amount: 0.74 },
  { league: "Ligue 1", short: "LI1", amount: 0.58 },
  { league: "Saudi Pro", short: "SPL", amount: 0.43 },
];

export const marketTrend: Record<string, { label: string; value: number }[]> = {
  "7D": [
    { label: "6 May", value: 3.1 },
    { label: "7 May", value: 3.5 },
    { label: "8 May", value: 3.3 },
    { label: "9 May", value: 4.1 },
    { label: "10 May", value: 4.0 },
    { label: "11 May", value: 4.8 },
    { label: "12 May", value: 5.42 },
  ],
  "30D": [
    { label: "W1", value: 2.4 },
    { label: "W2", value: 3.2 },
    { label: "W3", value: 4.1 },
    { label: "W4", value: 5.42 },
  ],
  "90D": [
    { label: "Mar", value: 2.0 },
    { label: "Apr", value: 3.2 },
    { label: "May", value: 5.42 },
  ],
  "1Y": [
    { label: "Q3", value: 1.2 },
    { label: "Q4", value: 2.6 },
    { label: "Q1", value: 2.2 },
    { label: "Q2", value: 3.8 },
    { label: "Q3 '25", value: 5.42 },
  ],
};

// Local storage persistent state helpers for Watchlist and My Club
const WATCHLIST_KEY = "ftm_watchlist_players";
const MY_CLUB_KEY = "ftm_my_club_selected";

export function getSavedWatchlist(): string[] {
  if (typeof window === "undefined") return ["haaland", "wirtz", "bellingham"];
  try {
    const saved = localStorage.getItem(WATCHLIST_KEY);
    return saved ? JSON.parse(saved) : ["haaland", "wirtz", "bellingham"];
  } catch {
    return ["haaland", "wirtz", "bellingham"];
  }
}

export function saveWatchlist(ids: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error("Failed to save watchlist", e);
  }
}

export function getSavedMyClub(): string {
  if (typeof window === "undefined") return "manutd";
  try {
    return localStorage.getItem(MY_CLUB_KEY) || "manutd";
  } catch {
    return "manutd";
  }
}

export function saveMyClub(clubId: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(MY_CLUB_KEY, clubId);
  } catch (e) {
    console.error("Failed to save my club", e);
  }
}
