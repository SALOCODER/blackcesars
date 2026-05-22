import type { Property } from './types'

export type Semaforo = 'verde' | 'amarillo' | 'rojo' | 'gris'

export const SEMAFORO_LABEL: Record<Semaforo, string> = {
  verde: 'Verde',
  amarillo: 'Amarillo',
  rojo: 'Rojo',
  gris: 'Sin clasificar',
}

export const SEMAFORO_CLASSES: Record<Semaforo, string> = {
  verde: 'bg-emerald-500',
  amarillo: 'bg-amber-400',
  rojo: 'bg-red-500',
  gris: 'bg-zinc-600',
}

// Placeholder. Real thresholds (días en estado, % presupuesto, € por categoría)
// están PENDING_KICKOFF (PRD §10.6). Hasta que César y Simón los definan,
// toda propiedad se muestra como 'gris' con tooltip explicando el porqué.
// Cuando lleguen los umbrales, esta función se reemplaza sin tocar componentes.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function computeSemaforo(_property: Property): Semaforo {
  return 'gris'
}

export const SEMAFORO_PENDING_REASON =
  'Umbrales pendientes de definir en kickoff con César y Simón (PRD §10.6).'
