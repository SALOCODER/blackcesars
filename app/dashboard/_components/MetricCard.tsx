import type { ReactNode } from 'react'
import { Tooltip } from './Tooltip'

type Props = {
  label: string
  value: ReactNode
  hint?: string
  tooltip?: string
  tone?: 'neutral' | 'positive' | 'negative' | 'muted'
}

const TONE_CLASSES: Record<NonNullable<Props['tone']>, string> = {
  neutral: 'text-zinc-100',
  positive: 'text-emerald-400',
  negative: 'text-red-400',
  muted: 'text-zinc-500',
}

export function MetricCard({ label, value, hint, tooltip, tone = 'neutral' }: Props) {
  const labelNode = (
    <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-zinc-500">
      {label}
      {tooltip ? <span aria-hidden="true" className="text-zinc-600">ⓘ</span> : null}
    </span>
  )

  return (
    <div className="flex flex-col gap-1 rounded border border-zinc-800 bg-zinc-950 px-3 py-2.5">
      {tooltip ? <Tooltip label={tooltip}>{labelNode}</Tooltip> : labelNode}
      <span className={`font-mono text-xl leading-tight tabular-nums ${TONE_CLASSES[tone]}`}>
        {value}
      </span>
      {hint ? <span className="text-[10px] text-zinc-600">{hint}</span> : null}
    </div>
  )
}
