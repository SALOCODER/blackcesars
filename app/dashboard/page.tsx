import Link from 'next/link'
import type { Metadata } from 'next'
import { FONDO_2_PROPERTIES } from '@/lib/seed/fondo2'
import { computeFundSnapshot } from '@/lib/seed/fund-snapshot'
import { FundHeader } from './_components/FundHeader'
import { PropertyCards } from './_components/PropertyCards'
import { PropertyTable } from './_components/PropertyTable'

export const metadata: Metadata = {
  title: 'Dashboard · Fondo 2 — Black Cesars OS',
}

export default function DashboardPage() {
  const properties = FONDO_2_PROPERTIES
  const snapshot = computeFundSnapshot(properties)

  return (
    <main className="min-h-screen font-mono">
      <header className="border-b border-zinc-800 px-3 py-2.5 md:px-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Link href="/" className="text-[10px] text-zinc-500 hover:text-zinc-300">
              ← Black Cesars OS
            </Link>
            <h1 className="text-sm font-semibold tracking-wide">Dashboard Ejecutivo</h1>
          </div>
          <div className="text-right text-[10px] text-zinc-500">
            <div>Versión MVP · Fase 1</div>
            <div>Datos seed · sin Supabase</div>
          </div>
        </div>
      </header>

      <div className="space-y-4 px-3 py-4 md:px-4">
        <FundHeader snapshot={snapshot} />

        <section>
          <div className="mb-2 flex items-baseline justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Propiedades
            </h2>
            <span className="text-[10px] text-zinc-500">
              {properties.length} en total
            </span>
          </div>
          <PropertyTable properties={properties} />
          <PropertyCards properties={properties} />
        </section>

        <footer className="border-t border-zinc-900 pt-3 text-[10px] leading-relaxed text-zinc-600">
          Filtros, ordenamiento, detalle por propiedad, P&amp;L con costos operativos y waterfall del fondo
          se incorporan en iteraciones siguientes (módulos 2-3 del PRD). Semáforo en espera de umbrales de
          kickoff (PRD §10.6).
        </footer>
      </div>
    </main>
  )
}
