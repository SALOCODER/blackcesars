import { formatEur, formatPct } from '@/lib/domain/money'
import { PROPERTY_STATUS_LABEL } from '@/lib/domain/property-status'
import type { FundSnapshot } from '@/lib/domain/types'
import { MetricCard } from './MetricCard'

type Props = {
  snapshot: FundSnapshot
}

export function FundHeader({ snapshot }: Props) {
  const profitTone =
    snapshot.grossProfitCents === null ? 'muted' : snapshot.grossProfitCents >= 0 ? 'positive' : 'negative'

  return (
    <section className="space-y-3">
      <div>
        <div className="flex items-baseline gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
            Fondo 2
          </h2>
          <span className="text-[10px] text-zinc-500">
            {snapshot.purchasedCount} comprados · {snapshot.pendingPurchaseCount} pendientes de compra
          </span>
        </div>
        <p className="text-[11px] text-zinc-500">
          Valoraciones según Hernán al 27-04-2026. Costos operativos (Renata) aún no integrados.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <MetricCard
          label="Capital invertido"
          value={formatEur(snapshot.capitalInvestedCents)}
          hint={`${snapshot.purchasedCount} activos comprados`}
          tooltip="Suma del precio de adquisición de las propiedades ya compradas (excluye pendientes de compra). No incluye desokupación, legales, rehabilitación ni servicios — esos costos llegan cuando se integre el sistema de Renata."
        />
        <MetricCard
          label="Valor estimado salida"
          value={snapshot.estimatedSaleValueCents === null ? '—' : formatEur(snapshot.estimatedSaleValueCents)}
          hint="Valoración Hernán"
          tooltip="Suma del valor estimado de salida a venta por propiedad, según las valoraciones de Hernán del 27-04-2026. Para propiedades sin valoración explícita se usa el precio de venta pactado/acordado."
        />
        <MetricCard
          label="Ganancia bruta proyectada"
          value={snapshot.grossProfitCents === null ? '—' : formatEur(snapshot.grossProfitCents)}
          hint="Sobre adquisición · pre-costos op."
          tone={profitTone}
          tooltip="Valor estimado de salida menos capital invertido en adquisición. NO descuenta costos operativos (desokupación, legales, comisiones, rehabilitación, IBI, etc.) — la cifra real será menor cuando se integren los costos de Renata."
        />
        <MetricCard
          label="Rentabilidad bruta"
          value={snapshot.grossProfitRatio === null ? '—' : formatPct(snapshot.grossProfitRatio)}
          hint="Ganancia bruta / capital invertido"
          tone={profitTone}
          tooltip="Ganancia bruta proyectada dividida por el capital invertido en adquisición. Sirve como techo del retorno; el número final caerá al sumar los costos operativos."
        />
      </div>

      <div className="flex flex-wrap gap-1.5 text-[10px]">
        {Object.entries(snapshot.statusCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([status, count]) => (
            <span
              key={status}
              className="inline-flex items-center gap-1 rounded border border-zinc-800 bg-zinc-950 px-1.5 py-0.5"
            >
              <span className="text-zinc-500">{PROPERTY_STATUS_LABEL[status as keyof typeof PROPERTY_STATUS_LABEL]}</span>
              <span className="font-mono text-zinc-200">{count}</span>
            </span>
          ))}
      </div>
    </section>
  )
}
