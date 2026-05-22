import { formatEur, formatPct } from '@/lib/domain/money'
import { computeSemaforo } from '@/lib/domain/semaforo'
import type { Property } from '@/lib/domain/types'
import { propertyExitValueCents, propertyGrossProfitCents, propertyGrossProfitRatio } from '@/lib/seed/fund-snapshot'
import { DataQualityChip } from './DataQualityChip'
import { SemaforoDot } from './SemaforoDot'
import { StatusBadge } from './StatusBadge'

type Props = {
  properties: Property[]
}

export function PropertyTable({ properties }: Props) {
  return (
    <div className="hidden overflow-x-auto rounded border border-zinc-800 md:block">
      <table className="w-full border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-zinc-800 bg-zinc-900/60 text-left text-[10px] uppercase tracking-wider text-zinc-500">
            <th className="px-2 py-2 font-medium">Sem.</th>
            <th className="px-2 py-2 font-medium">ID</th>
            <th className="px-2 py-2 font-medium">Dirección</th>
            <th className="px-2 py-2 font-medium">Localidad</th>
            <th className="px-2 py-2 font-medium">Estado</th>
            <th className="px-2 py-2 text-right font-medium">Costo</th>
            <th className="px-2 py-2 text-right font-medium">Valoración</th>
            <th className="px-2 py-2 text-right font-medium">Salida</th>
            <th className="px-2 py-2 text-right font-medium">Ganancia</th>
            <th className="px-2 py-2 text-right font-medium">%</th>
            <th className="px-2 py-2 font-medium">DQ</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((p) => {
            const exit = propertyExitValueCents(p)
            const profit = propertyGrossProfitCents(p)
            const ratio = propertyGrossProfitRatio(p)
            const profitClass =
              profit === null ? 'text-zinc-600' : profit >= 0 ? 'text-emerald-400' : 'text-red-400'

            return (
              <tr key={p.id} className="border-b border-zinc-900 last:border-0 hover:bg-zinc-900/40">
                <td className="px-2 py-1.5 align-middle">
                  <SemaforoDot value={computeSemaforo(p)} />
                </td>
                <td className="px-2 py-1.5 align-middle font-mono text-[10px] text-zinc-500">{p.id}</td>
                <td className="px-2 py-1.5 align-middle text-zinc-200">{p.address}</td>
                <td className="px-2 py-1.5 align-middle text-zinc-400">
                  {p.locality}
                  <span className="ml-1 text-zinc-600">· {p.province}</span>
                </td>
                <td className="px-2 py-1.5 align-middle">
                  <StatusBadge status={p.status} />
                </td>
                <td className="px-2 py-1.5 text-right align-middle font-mono tabular-nums text-zinc-300">
                  {formatEur(p.purchaseCostCents)}
                </td>
                <td className="px-2 py-1.5 text-right align-middle font-mono tabular-nums text-zinc-300">
                  {p.valuationCents === null ? <span className="text-zinc-600">—</span> : formatEur(p.valuationCents)}
                </td>
                <td className="px-2 py-1.5 text-right align-middle font-mono tabular-nums text-zinc-300">
                  {exit === null ? <span className="text-zinc-600">—</span> : formatEur(exit)}
                </td>
                <td className={`px-2 py-1.5 text-right align-middle font-mono tabular-nums ${profitClass}`}>
                  {profit === null ? <span className="text-zinc-600">—</span> : formatEur(profit)}
                </td>
                <td className={`px-2 py-1.5 text-right align-middle font-mono tabular-nums ${profitClass}`}>
                  {ratio === null ? <span className="text-zinc-600">—</span> : formatPct(ratio)}
                </td>
                <td className="px-2 py-1.5 align-middle">
                  <DataQualityChip flags={p.dataQuality} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
