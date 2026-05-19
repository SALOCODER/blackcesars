# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repo status

**Pre-implementation.** Only artifact is the PRD at [DOCS/masterplan.md/PRD_Black_Cesars_1.md](DOCS/masterplan.md/PRD_Black_Cesars_1.md). Gotcha: `masterplan.md` is a **folder**, not a file. Read the PRD before scaffolding — it is the source of truth, not this file.

## One-line product

**Black Cesars OS** — executive command system for a Spanish distressed-real-estate fund (properties with okupas). Founder in México, ops team in España. Immediate goal: rescue Fondo 2 (25 properties); scale later to Fondos 1, 3, 4, 5, 6.

## Build / test / lint commands

**None yet — project is pre-scaffolding.** When the first PR scaffolds the stack, replace this section with:
- Package manager + install command
- Dev server (frontend + backend) start commands
- Single-test invocation (e.g. `npm test -- path/to/file.test.ts`) — IMPORTANT: prefer single-test runs over the full suite for iteration speed
- Lint + typecheck (run both after a series of edits before declaring done)
- DB migration up/down
- WhatsApp bot worker entry point (Phase 2+)

Until then, there is nothing to build, run, or test.

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

### Suggested stack (PRD §6.1 — non-binding, but justify deviations)

React/Next.js + Tailwind • Node.js or Python/FastAPI REST • PostgreSQL • S3 (or equivalent) for media • `whatsapp-web.js` or Baileys for Phase 1, migrate to WhatsApp Business API in Phase 3 • Whisper for audio transcription • Anthropic API for the decisions module • Railway / Render / Vercel for hosting.

## Phased delivery (PRD §7)

- **Phase 1 (wk 1-3):** Dashboard + property detail + fund P&L/waterfall + **manual capture by Simón** (he ingests updates from the existing WhatsApp group by hand — bot does NOT exist yet) + decisions module beta. **Success: César sees real Fondo 2 state in <30s from México without asking anyone.**
- **Phase 2 (wk 4-6):** WhatsApp bot live in existing group, proactive + reactive ingestion, audio transcription, nightly founder summary, alerts, Renata integration, weekly report.
- **Phase 3 (wk 7-12):** Monthly + investor reports, replicate to Fondos 1/3/4/5/6, WhatsApp Business API migration.
- **Phase 4 (later):** Pre-purchase due diligence.

Do not build Phase 2 features in Phase 1, and so on. If a "small Phase 2 feature" is tempting during Phase 1, push back.

## Workflow & repo etiquette

- **Branches:** `phase{N}/<kebab-case-description>` (e.g. `phase1/waterfall-engine`, `phase2/whatsapp-bot-proactive`).
- **Commits:** present-tense, scope-prefixed when useful (`waterfall:`, `bot:`, `dashboard:`, `semaforo:`). Reference the PRD section when implementing a spec'd feature: `waterfall: implement catch-up tier (PRD §5.3.2)`.
- **PRs:** small and module-scoped. Do **not** bundle bot work with dashboard work.
- **Schema/migration changes** require a paired migration script — never edit the DB by hand, and never edit a migration that has been merged.
- **Plan mode** for any change touching >2 files or financial logic. Skip planning for typo-class fixes.

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
