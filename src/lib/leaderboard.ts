// PRNG seeded by week so leaderboard is stable for the week
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const NAMES = [
  "Adjoa", "Kossi", "Adèle", "Yawo", "Mawuli", "Sika", "Komlan", "Akua",
  "Selom", "Esi", "Kofi", "Ama", "Edem", "Délali", "Akossiwa", "Yaovi",
  "Afi", "Senam", "Etse", "Mensah", "Aïsha", "Béatrice", "Cédric", "Diane",
  "Ezéchiel", "Fatima", "Gildas", "Hortense", "Ismaël", "Justine",
];

const AVATARS = ["🧑🏾", "👨🏾", "👩🏾", "🧑🏿", "👨🏿", "👩🏿", "🧑🏽", "👨🏽", "👩🏽"];

export const LEAGUES = [
  { id: "bronze", name: "Bronze", color: "#cd7f32", emoji: "🥉" },
  { id: "silver", name: "Argent", color: "#c0c0c0", emoji: "🥈" },
  { id: "gold", name: "Or", color: "#ffd700", emoji: "🥇" },
  { id: "sapphire", name: "Saphir", color: "#0f52ba", emoji: "💙" },
  { id: "ruby", name: "Rubis", color: "#e0115f", emoji: "❤️" },
  { id: "emerald", name: "Émeraude", color: "#50c878", emoji: "💚" },
  { id: "diamond", name: "Diamant", color: "#b9f2ff", emoji: "💎" },
];

export function getLeague(totalXp: number) {
  if (totalXp < 100) return LEAGUES[0];
  if (totalXp < 300) return LEAGUES[1];
  if (totalXp < 700) return LEAGUES[2];
  if (totalXp < 1500) return LEAGUES[3];
  if (totalXp < 3000) return LEAGUES[4];
  if (totalXp < 6000) return LEAGUES[5];
  return LEAGUES[6];
}

export type Rival = { name: string; avatar: string; xp: number; isUser?: boolean };

export function getWeeklyLeaderboard(weekKey: string, userXp: number, userName: string, userAvatar: string): Rival[] {
  const seed = weekKey.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rand = mulberry32(seed);
  const list: Rival[] = NAMES.map((name, i) => ({
    name,
    avatar: AVATARS[Math.floor(rand() * AVATARS.length)],
    xp: Math.floor(rand() * 600) + 20,
  }));
  list.push({ name: userName, avatar: userAvatar, xp: userXp, isUser: true });
  list.sort((a, b) => b.xp - a.xp);
  return list;
}
