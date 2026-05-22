import {
  PROPERTY_STATUS_LABEL,
  PROPERTY_STATUS_TONE,
  STATUS_TONE_CLASSES,
  type PropertyStatus,
} from '@/lib/domain/property-status'

type Props = {
  status: PropertyStatus
}

export function StatusBadge({ status }: Props) {
  const tone = PROPERTY_STATUS_TONE[status]
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${STATUS_TONE_CLASSES[tone]}`}
    >
      {PROPERTY_STATUS_LABEL[status]}
    </span>
  )
}
