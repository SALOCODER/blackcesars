import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col font-mono">
      <header className="border-b border-zinc-800 px-4 py-3">
        <h1 className="text-sm font-semibold tracking-wide">BLACK CESARS OS</h1>
        <p className="text-xs text-zinc-500">
          Sistema de comando operativo-financiero · Fondos inmobiliarios
        </p>
      </header>

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md space-y-4">
          <Link
            href="/dashboard"
            className="block rounded border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="text-[10px] uppercase tracking-wider text-zinc-500">
              Módulo 1 · Fase 1 MVP
            </div>
            <div className="mt-1 flex items-center justify-between gap-3">
              <span className="text-base font-semibold text-zinc-100">
                Dashboard Ejecutivo — Fondo 2
              </span>
              <span aria-hidden="true" className="text-zinc-500">→</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-zinc-500">
              Estado de las 28 propiedades, capital invertido, valoraciones de Hernán
              y ganancia bruta proyectada.
            </p>
          </Link>

          <div className="rounded border border-dashed border-zinc-800 p-4 text-[11px] leading-snug text-zinc-500">
            Próximos módulos en construcción: vista detalle por propiedad, P&amp;L con costos operativos
            y waterfall del fondo, bot WhatsApp (Fase 2) y decisiones asistidas.
          </div>
        </div>
      </section>
    </main>
  )
}
