// Statuses observed in the real Fondo 2 data set.
// Two of these ("pendiente_de_compra", "listo_firma_arras") extend PRD §10.4
// — the PRD lists 12 states but the operational CSV uses these two real-world
// labels that don't map cleanly to the spec.
export type PropertyStatus =
  | 'pendiente_de_compra'
  | 'adquirida'
  | 'en_proceso_desocupacion'
  | 'desocupado'
  | 'en_rehabilitacion'
  | 'lista_venta'
  | 'listo_firma_arras'
  | 'en_negociacion'
  | 'vendido'
  | 'reokupada'
  | 'bloqueada_legal'
  | 'decision_pendiente'

export const PROPERTY_STATUS_LABEL: Record<PropertyStatus, string> = {
  pendiente_de_compra: 'Pendiente de compra',
  adquirida: 'Adquirida',
  en_proceso_desocupacion: 'En proceso de desocupación',
  desocupado: 'Desocupado',
  en_rehabilitacion: 'En rehabilitación',
  lista_venta: 'Lista para venta',
  listo_firma_arras: 'Listo para firma de arras',
  en_negociacion: 'En negociación',
  vendido: 'Vendido',
  reokupada: 'Reokupada',
  bloqueada_legal: 'Bloqueada legal',
  decision_pendiente: 'Decisión pendiente',
}

type StatusTone = 'neutral' | 'pending' | 'progress' | 'ready' | 'success' | 'danger'

export const PROPERTY_STATUS_TONE: Record<PropertyStatus, StatusTone> = {
  pendiente_de_compra: 'pending',
  adquirida: 'neutral',
  en_proceso_desocupacion: 'progress',
  desocupado: 'ready',
  en_rehabilitacion: 'progress',
  lista_venta: 'ready',
  listo_firma_arras: 'ready',
  en_negociacion: 'progress',
  vendido: 'success',
  reokupada: 'danger',
  bloqueada_legal: 'danger',
  decision_pendiente: 'pending',
}

export const STATUS_TONE_CLASSES: Record<StatusTone, string> = {
  neutral: 'bg-zinc-800 text-zinc-300 ring-1 ring-inset ring-zinc-700',
  pending: 'bg-amber-950/40 text-amber-300 ring-1 ring-inset ring-amber-900/60',
  progress: 'bg-sky-950/40 text-sky-300 ring-1 ring-inset ring-sky-900/60',
  ready: 'bg-violet-950/40 text-violet-300 ring-1 ring-inset ring-violet-900/60',
  success: 'bg-emerald-950/40 text-emerald-300 ring-1 ring-inset ring-emerald-900/60',
  danger: 'bg-red-950/40 text-red-300 ring-1 ring-inset ring-red-900/60',
}
