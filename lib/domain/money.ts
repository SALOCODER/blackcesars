export type MoneyCents = number

export function eurosToCents(euros: number): MoneyCents {
  return Math.round(euros * 100)
}

export function centsToEuros(cents: MoneyCents): number {
  return cents / 100
}

const eurFormatter = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

const eurFormatterWithCents = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatEur(cents: MoneyCents, opts: { withCents?: boolean } = {}): string {
  const euros = centsToEuros(cents)
  return opts.withCents ? eurFormatterWithCents.format(euros) : eurFormatter.format(euros)
}

const pctFormatter = new Intl.NumberFormat('es-ES', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

export function formatPct(ratio: number): string {
  return pctFormatter.format(ratio)
}

// Source files contain mixed formats: Spanish ("231.391,00") and English ("94,021.00").
// This parser accepts both and returns integer cents.
export function parseEurString(raw: string): MoneyCents {
  const trimmed = raw.replace(/[€\s]/g, '').trim()
  if (!trimmed) return 0

  const hasComma = trimmed.includes(',')
  const hasDot = trimmed.includes('.')

  let normalized: string
  if (hasComma && hasDot) {
    const lastComma = trimmed.lastIndexOf(',')
    const lastDot = trimmed.lastIndexOf('.')
    if (lastComma > lastDot) {
      normalized = trimmed.replace(/\./g, '').replace(',', '.')
    } else {
      normalized = trimmed.replace(/,/g, '')
    }
  } else if (hasComma) {
    const parts = trimmed.split(',')
    normalized = parts[parts.length - 1].length === 2 && parts.length === 2
      ? trimmed.replace(',', '.')
      : trimmed.replace(/,/g, '')
  } else {
    normalized = trimmed
  }

  const value = Number(normalized)
  if (!Number.isFinite(value)) {
    throw new Error(`Cannot parse EUR string: ${raw}`)
  }
  return eurosToCents(value)
}
