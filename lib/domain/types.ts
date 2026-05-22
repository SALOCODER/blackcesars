import type { MoneyCents } from './money'
import type { PropertyStatus } from './property-status'
import type { DataQualityFlag } from './data-quality'

export type Property = {
  id: string
  address: string
  locality: string
  province: string
  cadastralRef: string | null
  purchaseCostCents: MoneyCents
  valuationCents: MoneyCents | null
  salePriceCents: MoneyCents | null
  status: PropertyStatus
  details: string | null
  notes: string | null
  dataQuality: DataQualityFlag[]
}

export type FundSnapshot = {
  propertyCount: number
  purchasedCount: number
  pendingPurchaseCount: number
  capitalInvestedCents: MoneyCents
  estimatedSaleValueCents: MoneyCents | null
  grossProfitCents: MoneyCents | null
  grossProfitRatio: number | null
  statusCounts: Partial<Record<PropertyStatus, number>>
}
