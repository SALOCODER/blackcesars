# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo status

**Scaffold inicial listo.** Stack vivo: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 + Supabase JS (con las API keys nuevas `sb_publishable_*` / `sb_secret_*`). El PRD vive en [DOCS/masterplan.md/PRD_Black_Cesars_1.md](DOCS/masterplan.md/PRD_Black_Cesars_1.md) (gotcha: `masterplan.md` es una **carpeta**, no un archivo) y sigue siendo la fuente de verdad del producto — este archivo no.

## One-line product

**Black Cesars OS** — executive command system for a Spanish distressed-real-estate fund (properties with okupas). Founder in México, ops team in España. Immediate goal: rescue Fondo 2 (25 properties); scale later to Fondos 1, 3, 4, 5, 6.

## Project Stack

- TypeScript for all source code
- Markdown for documentation
- Prefer Edit over Write when modifying existing files

## Build / test / lint commands

Package manager: **npm**. Install: `npm install`.

| Comando | Hace |
|---|---|
| `npm run dev` | Dev server (Turbopack) en http://localhost:3000 |
| `npm run build` | Production build (next build) |
| `npm run start` | Sirve el build de producción — requiere `npm run build` antes |
| `npm run lint` | ESLint con `eslint-config-next` (flat config en `eslint.config.mjs`) |
| `npm run typecheck` | `tsc --noEmit` — valida tipos sin emitir |

IMPORTANT: después de una serie de edits, correr `npm run typecheck` antes de declarar done. Para tests, cuando exista test runner, **preferir single-test invocations** sobre toda la suite para velocidad de iteración.

**Env vars locales:** crear `.env.local` en la raíz con `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY`. Ese archivo está en `.gitignore` — nunca commitearlo.

**Pendiente de scaffoldar** (cuando exista, documentar acá):
- Test runner + comando single-test
- Supabase CLI + migrations up/down
- WhatsApp bot worker entry point (Fase 2+)

## Hard rules — YOU MUST follow

- **UI language: Spanish** (España + México variants). No other locales.
- **Primary currency: EUR.** USD/MXN are reference conversions only.
- **Two timezones live in the system:** España (operations) and México (founder). Bot scheduling and notifications respect the **recipient's** timezone, not the server's.
- **Mobile-first for the founder** — must be usable from a phone in México.
- **Information-dense UI** (Bloomberg Terminal feel), not minimalist whitespace. Every metric carries a tooltip explaining its calculation.
- **Configurable thresholds — never hard-code** semáforo or alert values. Store them in config/DB so they can be tuned without redeploy.
- **Human in the loop.** The system never auto-executes critical decisions; César approves.
- **Audit logs + role-based access control are mandatory** (PRD §6.3), not optional add-ons.
- **WhatsApp bot lives in the *existing* tactical-team group**, not a new one. Default response format is **1-tap numeric replies** (PRD §9 adoption mitigation — the team will not adopt anything that asks them to type).
- **MVP-first ethos** (PRD §11): "MVP feo y funcional" beats "bonito y tardío." Phase 1 ships in 3 weeks.
- **Verbose logging during early weeks** for adoption diagnostics.

## Out of scope — do NOT build (PRD §3.3)

- CRM features (lead capture, marketing funnels)
- Investor relations (KYC, capital calls, contracts) — lives in another process
- A replacement for Renata's accounting system (the OS *complements* it)
- Pre-purchase due-diligence module (that is Phase 4, not now)

## Load-bearing domain rules

### Waterfall — implement in this exact order (PRD §5.3.2, §10.3)

1. **Return of capital (100%)** to investors
2. **Preferred return: 13% annual on capital** to investors
3. **Catch-up: 8%** to Simón + César
4. **Excedente: 50% investors / 50% Simón + César**

Compute continuously under **two scenarios**: Liquidation today (Hernán's current estimated prices) and Original plan. IMPORTANT: financial logic without tests against the worked example in §5.3.2 must not merge.

### Property states (PRD §10.4)

Eleven states: Adquirida, En desokupación, Libre, En rehabilitación, Lista venta, En negociación, Vendida, Reokupada, Bloqueada legal, Demolición pendiente, Decisión pendiente. (Pre-purchase "Identificada" is out of V1.)

### Cost categories (PRD §10.5)

Open list, **not an enum** — must be extensible at runtime without a code change.

### Roles & permissions

Authoritative matrix: PRD §4.3. Key invariants:
- **Hernán is the only writer for estimated sale price.**
- **Equipo Táctico (Paco/Samuel/Jonathan) interacts ONLY via WhatsApp**, never the dashboard.
- César has full access; everyone else has scoped writes.

## Architecture — seven modules (PRD §6)

1. **Dashboard Ejecutivo** — single-screen fund overview, semáforo per property
2. **Vista Detalle de Propiedad** — timeline, P&L, valuations, decisions log
3. **P&L + Waterfall del Fondo** — two-scenario fund financials
4. **Bot de WhatsApp** — proactive prompts + reactive ingestion (text/audio/photo)
5. **Decisiones Asistidas por Claude** — *the differentiating module*; loads full property context, calls Anthropic API, returns structured analysis, logs the decision
6. **Semáforo + Alerts engine** — configurable threshold rules
7. **Reportes** — weekly auto (replaces Xenia's current report), monthly executive, investor-facing (V2)

### Stack actual (ya scaffoldeado)

- **Frontend + backend:** Next.js 16 con App Router, React 19, TypeScript estricto, Tailwind v4 (postcss-only, sin `tailwind.config`). Server Components para lógica server-side; **no hay** backend Node/Python separado.
- **DB + auth + storage:** Supabase (Postgres + Auth + Storage). Cliente en [lib/supabase.ts](lib/supabase.ts) exporta dos cosas:
  - `supabase` — cliente browser, usa publishable key, RLS es el security boundary.
  - `createAdminClient()` — server-only, usa secret key, **bypassa RLS**. Tiene guard runtime contra ejecución en el browser. NUNCA importar desde un Client Component.
- API keys: usar las **nuevas** (`sb_publishable_*` / `sb_secret_*`), NO las legacy `anon` / `service_role`.
- **Hosting:** Vercel. Env vars en Project Settings → Environment Variables (las tres activadas en Production + Preview + Development):
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - `SUPABASE_SECRET_KEY`
- **Path alias:** `@/*` apunta a la raíz del repo. Importar como `import { supabase } from '@/lib/supabase'`.
- **Pendiente (fases siguientes):** `whatsapp-web.js` o Baileys para Fase 1 del bot, migrar a WhatsApp Business API en Fase 3 • Whisper para transcripción de audio • Anthropic API para el módulo de Decisiones Asistidas.

## Phased delivery (PRD §7)

- **Phase 1 (wk 1-3):** Dashboard + property detail + fund P&L/waterfall + **manual capture by Simón** (he ingests updates from the existing WhatsApp group by hand — bot does NOT exist yet) + decisions module beta. **Success: César sees real Fondo 2 state in <30s from México without asking anyone.**
- **Phase 2 (wk 4-6):** WhatsApp bot live in existing group, proactive + reactive ingestion, audio transcription, nightly founder summary, alerts, Renata integration, weekly report.
- **Phase 3 (wk 7-12):** Monthly + investor reports, replicate to Fondos 1/3/4/5/6, WhatsApp Business API migration.
- **Phase 4 (later):** Pre-purchase due diligence.

Do not build Phase 2 features in Phase 1, and so on. If a "small Phase 2 feature" is tempting during Phase 1, push back.

## Branches — solo dos, nunca crear más sin permiso

Este repo usa **exactamente dos ramas**. YOU MUST NOT crear otras sin que el usuario lo pida explícitamente.

- **`main`** = **PRODUCCIÓN.** Lo que los usuarios ven online.
- **`staging`** = **DESARROLLO.** Donde probamos cambios antes de publicar.

### Vocabulario — traducir siempre a la rama correcta

Cuando el usuario diga cualquiera de estos términos, asumir la rama indicada sin preguntar:

| El usuario dice… | Rama |
|---|---|
| "producción", "prod", "main", "online", "la web", "publicar", "subir a producción", "lo que los usuarios van a ver" | **`main`** |
| "desarrollo", "development", "dev", "staging", "ambiente de prueba", "entorno de pruebas" | **`staging`** |

### Reglas por defecto

- **Todos los commits van en `staging`.** YOU MUST hacer `git checkout staging` antes de commitear si no estás ya en ella.
- **`main` solo recibe merges desde `staging`** — y solo cuando el usuario pide explícitamente publicar (usá los sinónimos de "producción" de arriba para reconocer la intención).
- **NO crear ramas nuevas por iniciativa propia.** Solo si el usuario pide explícitamente "crea una rama para X funcionalidad". En ese caso, ramificar desde `staging`, nunca desde `main`.
- Esta convención **reemplaza** cualquier patrón previo tipo `phase{N}/...` o feature branches por módulo.

## Workflow & repo etiquette

- **Commits:** present-tense, scope-prefixed when useful (`waterfall:`, `bot:`, `dashboard:`, `semaforo:`). Reference the PRD section when implementing a spec'd feature: `waterfall: implement catch-up tier (PRD §5.3.2)`.
- **Merges a `main`:** small and module-scoped — do **not** bundle bot work with dashboard work en un solo publish.
- **Schema/migration changes** require a paired migration script — never edit the DB by hand, and never edit a migration that has been merged.
- **Plan mode** for any change touching >2 files or financial logic. Skip planning for typo-class fixes.

## Bash Usage

- Batch related shell commands when possible rather than running them individually
- Prefer Glob/Grep tools over `find` and `ls` for file discovery

## Code style

- File names, identifiers, code comments: **English.** User-facing strings: **Spanish.** No bilingual identifiers.
- **Money: store as integer cents** (`amountInCents: number`), never floats. Format only at the display edge.
- **Timestamps: store UTC ISO 8601.** Convert at the edge using the recipient's timezone.
- **No magic numbers in financial logic** — bind to named constants (`PREFERRED_RETURN_RATE`, `CATCHUP_RATE`, `EXCEDENTE_SPLIT`). If a kickoff-pending value (see next section) is needed, do not invent one.
- Tests for waterfall, semáforo, and P&L math are **non-negotiable**. UI tests are not required in Phase 1.

## Decisions pending kickoff — do NOT silently default (PRD §10.6)

These values are not in the PRD. If a feature needs one and the repo doesn't have it, **STOP and ask the user**:

- Exact semáforo thresholds (days, %, € per category)
- Original budget per Fondo 2 property (needed for deviation math)
- Spend approval thresholds (€ ceiling before requiring César)
- Bot proactive cadence per property/state
- Re-valuation cadence (biweekly? monthly?)
- Data retention + backup policy

## Common gotchas

- `DOCS/masterplan.md` is a folder, not a file. Read the PRD inside it.
- The WhatsApp number is **virtual** (Twilio or equivalent). Never assume a SIM or physical phone.
- Re-occupation (`Reokupada`) is a real state that flips a property back from any later stage — handle it as a state transition that resets, not as a terminal failure.
- Hernán's estimated prices are the input to the waterfall's "Liquidation today" scenario. If they go stale, the whole projection goes stale — re-valuation cadence enforcement is a real feature, not a nice-to-have.
- Renata runs a separate accounting system. Phase 2 integrates with it; Phase 1 does **not** try to replace or absorb it.
