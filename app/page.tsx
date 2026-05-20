export default function HomePage() {
  return (
    <main className="min-h-screen font-mono">
      <header className="border-b border-zinc-800 px-4 py-3">
        <h1 className="text-sm font-semibold tracking-wide">BLACK CESARS OS</h1>
        <p className="text-xs text-zinc-500">
          Sistema de comando operativo-financiero · Fondo 2
        </p>
      </header>
      <section className="space-y-3 p-4">
        <div className="rounded border border-zinc-800 p-3 text-xs text-zinc-400">
          Scaffold inicial. El Dashboard Ejecutivo (Módulo 1 del PRD) se
          construye en una tarea separada.
        </div>
        <div className="rounded border border-zinc-800 p-3 text-xs text-zinc-400">
          Stack: Next.js 16 · React 19 · TypeScript · Tailwind v4 · Supabase
          (publishable + secret keys nuevas).
        </div>
      </section>
    </main>
  )
}
