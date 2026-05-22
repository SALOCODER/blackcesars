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

export function PropertyCards({ properties }: Props) {
  return (
    <div className="flex flex-col gap-2 md:hidden">
      {properties.map((p) => {
        const exit = propertyExitValueCents(p)
        const profit = propertyGrossProfitCents(p)
        const ratio = propertyGrossProfitRatio(p)
        const profitClass =
          profit === null ? 'text-zinc-600' : profit >= 0 ? 'text-emerald-400' : 'text-red-400'

        return (
          <article
            key={p.id}
            className="rounded border border-zinc-800 bg-zinc-950 p-3"
          >
            <header className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <SemaforoDot value={computeSemaforo(p)} />
                  <span className="truncate text-[13px] font-medium text-zinc-100">{p.address}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-zinc-500">
                  <span className="font-mono">{p.id}</span>
                  <span className="mx-1">·</span>
                  {p.locality}, {p.province}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={p.status} />
                <DataQualityChip flags={p.dataQuality} />
              </div>
            </header>

            <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-zinc-900 pt-2">
              <div>
                <dt className="text-[9px] uppercase tracking-wider text-zinc-500">Costo</dt>
                <dd className="font-mono text-[12px] tabular-nums text-zinc-200">
                  {formatEur(p.purchaseCostCents)}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-wider text-zinc-500">Salida</dt>
                <dd className="font-mono text-[12px] tabular-nums text-zinc-200">
                  {exit === null ? <span className="text-zinc-600">—</span> : formatEur(exit)}
                </dd>
              </div>
              <div>
                <dt className="text-[9px] uppercase tracking-wider text-zinc-500">Ganancia</dt>
                <dd className={`font-mono text-[12px] tabular-nums ${profitClass}`}>
                  {profit === null ? (
                    <span className="text-zinc-600">—</span>
                  ) : (
                    <>
                      {formatEur(profit)}
                      {ratio !== null ? (
                        <span className="ml-1 text-[10px] text-zinc-500">({formatPct(ratio)})</span>
                      ) : null}
                    </>
                  )}
                </dd>
              </div>
            </dl>

            {p.notes ? (
              <p className="mt-2 line-clamp-2 text-[10px] leading-snug text-zinc-500">{p.notes}</p>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
