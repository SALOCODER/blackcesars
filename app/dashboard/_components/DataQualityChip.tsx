import type { DataQualityFlag } from '@/lib/domain/data-quality'
import { Tooltip } from './Tooltip'

type Props = {
  flags: DataQualityFlag[]
}

export function DataQualityChip({ flags }: Props) {
  if (flags.length === 0) return null

  const summary = flags.map((f) => `• ${f.message}`).join('\n')

  return (
    <Tooltip label={summary}>
      <span className="inline-flex items-center gap-1 rounded bg-amber-950/50 px-1.5 py-0.5 text-[10px] font-medium text-amber-300 ring-1 ring-inset ring-amber-900/60">
        <span aria-hidden="true">⚠</span>
        <span>Revisar</span>
        {flags.length > 1 ? <span className="text-amber-500">×{flags.length}</span> : null}
      </span>
    </Tooltip>
  )
}
