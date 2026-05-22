import {
  SEMAFORO_CLASSES,
  SEMAFORO_LABEL,
  SEMAFORO_PENDING_REASON,
  type Semaforo,
} from '@/lib/domain/semaforo'
import { Tooltip } from './Tooltip'

type Props = {
  value: Semaforo
}

export function SemaforoDot({ value }: Props) {
  const dot = (
    <span
      aria-label={`Semáforo: ${SEMAFORO_LABEL[value]}`}
      className={`inline-block h-2.5 w-2.5 rounded-full ${SEMAFORO_CLASSES[value]}`}
    />
  )

  if (value === 'gris') {
    return <Tooltip label={SEMAFORO_PENDING_REASON}>{dot}</Tooltip>
  }

  return dot
}
