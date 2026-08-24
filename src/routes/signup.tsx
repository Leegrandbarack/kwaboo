import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Loader2, Check, WifiOff, AlertCircle, ArrowRight, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { Ayi } from "@/components/Ayi";
import { load } from "@/lib/progress";
import illustration from "@/assets/login-illustration.jpg";

function destinationAfterAuth(): "/" | "/onboarding" {
  try {
    return load().onboarded ? "/" : "/onboarding";
  } catch {
    return "/";
  }
}

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Créer un compte — Kwabo" },
      {
        name: "description",
        content:
          "Crée ton compte Kwabo et commence ton apprentissage des langues africaines avec AYI.",
      },
      { property: "og:title", content: "Créer un compte — Kwabo" },
      {
        property: "og:description",
        content: "Rejoins Kwabo et apprends le Fɔngbè pas à pas, avec AYI.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignupPage,
});

type Status = "idle" | "loading" | "success" | "error";

function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [online, setOnline] = useState(true);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const busy = status === "loading" || status === "success" || googleLoading;

  function validate() {
    const errs: { email?: string; password?: string } = {};
    const value = email.trim();
    if (!value) errs.email = "Entre ton adresse e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) errs.email = "Cette adresse e-mail n'est pas valide.";
    if (!password) errs.password = "Choisis un mot de passe.";
    else if (password.length < 6) errs.password = "6 caractères minimum.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!validate()) return;
    if (!online) {
      setStatus("error");
      setError("Tu sembles hors ligne. Vérifie ta connexion Internet puis réessaie.");
      return;
    }
    setStatus("loading");
    const { data, error: authError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: { emailRedirectTo: window.location.origin },
    });
    if (authError) {
      setStatus("error");
      setError(
        /already|registered|exists/i.test(authError.message)
          ? "Un compte existe déjà avec cet e-mail. Connecte-toi plutôt."
          : "Inscription impossible pour le moment. Réessaie dans un instant.",
      );
      return;
    }
    if (!data.session) {
      // Email confirmation required: user is NOT signed in yet.
      setStatus("idle");
      setCheckEmail(true);
      return;
    }
    setStatus("success");
    setTimeout(() => router.navigate({ to: destinationAfterAuth() }), 750);
  }

  async function handleGoogle() {
    setError(null);
    if (!online) {
      setError("Tu sembles hors ligne. Vérifie ta connexion Internet puis réessaie.");
      return;
    }
    setGoogleLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if ("error" in result && result.error) {
      setGoogleLoading(false);
      setError("La connexion avec Google a échoué. Réessaie.");
      return;
    }
    if (!("redirected" in result && result.redirected)) {
      router.navigate({ to: destinationAfterAuth() });
    }
  }

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* Visual side — desktop only */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-secondary/50 p-12">
        <img
          src={illustration}
          alt="Motifs géométriques africains et bulles de dialogue évoquant les langues du continent"
          width={1024}
          height={1280}
          loading="lazy"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/25 to-background/60"
        />
        <div className="relative z-10 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero font-display text-lg font-black text-primary-foreground">
            K
          </span>
          <span className="font-display text-xl font-black tracking-tight">KWABO</span>
        </div>
        <div className="relative z-10 max-w-md">
          <Ayi size={104} mood="cheer" />
          <h2 className="mt-6 font-display text-3xl font-black leading-tight">
            Ton aventure commence ici.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Crée ton compte pour sauvegarder ta progression, défier tes amis et
            apprendre le Fɔngbè avec AYI.
          </p>
        </div>
        <p className="relative z-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Apprendre une langue, c&apos;est découvrir un monde.
        </p>
      </aside>

      {/* Form side */}
      <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-10 sm:px-8">
        <div className="w-full max-w-[27rem] rise-in">
          <div className="flex items-center gap-3 lg:hidden">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-hero font-display text-lg font-black text-primary-foreground">
              K
            </span>
            <span className="font-display text-lg font-black tracking-tight">KWABO</span>
          </div>

          {checkEmail ? (
            <div className="mt-7 lg:mt-0 text-center">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-primary/10">
                <MailCheck className="h-8 w-8 text-primary" aria-hidden />
              </div>
              <h1 className="mt-5 font-display text-3xl font-black leading-tight sm:text-4xl">
                Vérifie ta boîte mail !
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Nous avons envoyé un lien de confirmation à{" "}
                <span className="font-bold text-foreground">{email.trim()}</span>.
                Clique dessus pour activer ton compte, puis connecte-toi.
              </p>
              <Link
                to="/login"
                className="btn-3d mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-display text-sm font-black uppercase tracking-widest text-primary-foreground"
              >
                Aller à la connexion
              </Link>
              <Link
                to="/onboarding"
                className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-display text-sm font-black uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Ignorer la connexion
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-7 text-sm font-bold text-primary lg:mt-0">Bienvenue sur Kwabo 👋🏾</p>
              <h1 className="mt-1.5 font-display text-3xl font-black leading-tight sm:text-4xl">
                Crée ton compte
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Rejoins Kwabo et sauvegarde ta progression.
              </p>

              {!online && (
                <div
                  role="status"
                  className="mt-6 flex items-start gap-2.5 rounded-2xl border border-gold/40 bg-gold/10 p-3.5 text-sm font-semibold text-gold-foreground"
                >
                  <WifiOff className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  <span>Pas de connexion Internet. Reconnecte-toi pour créer ton compte.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-7 space-y-5" noValidate>
                <div>
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Adresse e-mail
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="exemple@email.com"
                    value={email}
                    maxLength={255}
                    disabled={busy}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setFieldErrors((f) => ({ ...f, email: undefined }));
                    }}
                    className={`mt-2 h-13 w-full rounded-2xl border bg-card px-4 py-3.5 text-base font-semibold outline-none transition-[border-color,box-shadow] duration-200 placeholder:font-medium placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:opacity-60 ${
                      fieldErrors.email ? "border-destructive" : "border-input"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1.5 text-xs font-bold text-destructive">
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Mot de passe
                  </label>
                  <div className="relative mt-2">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="6 caractères minimum"
                      value={password}
                      maxLength={72}
                      disabled={busy}
                      aria-invalid={!!fieldErrors.password}
                      aria-describedby={fieldErrors.password ? "password-error" : undefined}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setFieldErrors((f) => ({ ...f, password: undefined }));
                      }}
                      className={`h-13 w-full rounded-2xl border bg-card py-3.5 pl-4 pr-14 text-base font-semibold outline-none transition-[border-color,box-shadow] duration-200 placeholder:font-medium placeholder:text-muted-foreground/70 focus:border-primary focus:ring-4 focus:ring-primary/15 disabled:opacity-60 ${
                        fieldErrors.password ? "border-destructive" : "border-input"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                      aria-pressed={showPassword}
                      className="press absolute right-1.5 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p id="password-error" className="mt-1.5 text-xs font-bold text-destructive">
                      {fieldErrors.password}
                    </p>
                  )}
                </div>

                {error && (
                  <div
                    role="alert"
                    className="shake flex items-start gap-2.5 rounded-2xl border border-destructive/40 bg-destructive/10 p-3.5 text-sm font-semibold text-destructive"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className={`btn-3d flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-display text-sm font-black uppercase tracking-widest ${
                    status === "success"
                      ? "bg-success text-success-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" aria-hidden />}
                  {status === "success" && <Check className="h-5 w-5" aria-hidden />}
                  {status === "loading"
                    ? "Création…"
                    : status === "success"
                      ? "Compte créé !"
                      : "Créer mon compte"}
                </button>
                <p aria-live="polite" className="sr-only">
                  {status === "loading" ? "Création du compte en cours" : status === "success" ? "Compte créé" : ""}
                </p>
              </form>

              <div className="my-7 flex items-center gap-4">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  ou continuer avec
                </span>
                <span className="h-px flex-1 bg-border" />
              </div>

              <button
                type="button"
                onClick={handleGoogle}
                disabled={busy}
                className="press flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-input bg-card font-display text-sm font-black tracking-wide transition-colors hover:bg-muted disabled:opacity-60"
              >
                {googleLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.8Z" />
                    <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2a7 7 0 0 1-6.6-4.8H1.4v3.1A11.9 11.9 0 0 0 12 24Z" />
                    <path fill="#FBBC05" d="M5.4 14.5a7.2 7.2 0 0 1 0-4.6V6.8H1.4a11.9 11.9 0 0 0 0 10.7l4-3Z" />
                    <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5A11.6 11.6 0 0 0 12 0 11.9 11.9 0 0 0 1.4 6.8l4 3.1A7 7 0 0 1 12 4.8Z" />
                  </svg>
                )}
                Continuer avec Google
              </button>

              <Link
                to="/onboarding"
                className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl font-display text-sm font-black uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Ignorer la connexion
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>

              <p className="mt-8 text-center text-sm font-semibold text-muted-foreground">
                Tu as déjà un compte ?{" "}
                <Link to="/login" className="font-black text-primary underline-offset-4 hover:underline">
                  Se connecter
                </Link>
              </p>

              <p className="mt-10 text-center text-[11px] font-medium italic text-muted-foreground/80 lg:hidden">
                Apprendre une langue, c&apos;est découvrir un monde.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
