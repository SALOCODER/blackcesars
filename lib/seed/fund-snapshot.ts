import type { Property, FundSnapshot } from '@/lib/domain/types'
import type { PropertyStatus } from '@/lib/domain/property-status'

function exitValueCents(property: Property): number | null {
  if (property.valuationCents !== null) return property.valuationCents
  if (property.salePriceCents !== null) return property.salePriceCents
  return null
}

export function computeFundSnapshot(properties: Property[]): FundSnapshot {
  const statusCounts: Partial<Record<PropertyStatus, number>> = {}
  let purchasedCount = 0
  let pendingPurchaseCount = 0
  let capitalInvestedCents = 0
  let estimatedSaleValueCents = 0
  let estimatedAnyAvailable = false

  for (const p of properties) {
    statusCounts[p.status] = (statusCounts[p.status] ?? 0) + 1

    if (p.status === 'pendiente_de_compra') {
      pendingPurchaseCount += 1
      continue
    }

    purchasedCount += 1
    capitalInvestedCents += p.purchaseCostCents

    const exit = exitValueCents(p)
    if (exit !== null) {
      estimatedSaleValueCents += exit
      estimatedAnyAvailable = true
    }
  }

  const estimated = estimatedAnyAvailable ? estimatedSaleValueCents : null
  const grossProfitCents = estimated === null ? null : estimated - capitalInvestedCents
  const grossProfitRatio =
    estimated === null || capitalInvestedCents === 0 ? null : grossProfitCents! / capitalInvestedCents

  return {
    propertyCount: properties.length,
    purchasedCount,
    pendingPurchaseCount,
    capitalInvestedCents,
    estimatedSaleValueCents: estimated,
    grossProfitCents,
    grossProfitRatio,
    statusCounts,
  }
}

export function propertyExitValueCents(property: Property): number | null {
  return exitValueCents(property)
}

export function propertyGrossProfitCents(property: Property): number | null {
  const exit = exitValueCents(property)
  if (exit === null) return null
  return exit - property.purchaseCostCents
}

export function propertyGrossProfitRatio(property: Property): number | null {
  const profit = propertyGrossProfitCents(property)
  if (profit === null || property.purchaseCostCents === 0) return null
  return profit / property.purchaseCostCents
}
