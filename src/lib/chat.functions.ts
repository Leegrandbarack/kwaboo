import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant", "system"]),
  content: z.string().min(1).max(2000),
});

const RequestSchema = z.object({
  scenario: z.string().min(1).max(60),
  messages: z.array(MessageSchema).min(1).max(40),
});

const SYSTEM_PROMPT = `Tu es AYI, un tuteur africain chaleureux qui enseigne le FON (Fɔngbè, langue du Bénin) à des francophones débutants.

Règles strictes :
1. Réponds TOUJOURS dans ce format JSON exact (aucun texte hors JSON) :
{
  "fon": "ta phrase en Fon",
  "french": "traduction française",
  "tip": "courte astuce culturelle ou grammaticale (1 phrase)",
  "correction": "si l'utilisateur a écrit en Fon avec une erreur, corrige gentiment ; sinon laisse vide"
}
2. Garde tes phrases en Fon COURTES (max 12 mots) et accessibles au niveau débutant.
3. Utilise l'orthographe officielle avec les tons quand pertinent (à, á, ɛ̀, ɔ̀, ɖ, etc.).
4. Encourage l'utilisateur, sois bienveillant.
5. Reste dans le scénario donné.`;

export const chatWithAyi = createServerFn({ method: "POST" })
  .inputValidator((input) => RequestSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "Configuration IA manquante", reply: null };
    }

    const scenarioPrompt = `Scénario actuel : ${data.scenario}. Reste dans ce contexte.`;

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "system", content: scenarioPrompt },
            ...data.messages,
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (res.status === 429) return { error: "Trop de requêtes, réessaie dans un instant.", reply: null };
      if (res.status === 402) return { error: "Crédits IA épuisés. Ajoute des crédits à ton workspace.", reply: null };
      if (!res.ok) {
        const text = await res.text();
        console.error("AI gateway error", res.status, text);
        return { error: "Erreur IA", reply: null };
      }

      const json = await res.json();
      const raw = json.choices?.[0]?.message?.content ?? "{}";
      let parsed: { fon?: string; french?: string; tip?: string; correction?: string };
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = { fon: raw, french: "", tip: "", correction: "" };
      }
      return {
        error: null,
        reply: {
          fon: parsed.fon ?? "",
          french: parsed.french ?? "",
          tip: parsed.tip ?? "",
          correction: parsed.correction ?? "",
        },
      };
    } catch (e) {
      console.error("chatWithAyi failed", e);
      return { error: "Connexion impossible avec AYI", reply: null };
    }
  });
