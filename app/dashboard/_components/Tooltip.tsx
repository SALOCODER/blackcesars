import type { ReactNode } from 'react'

type Props = {
  label: string
  children: ReactNode
  side?: 'top' | 'bottom'
}

export function Tooltip({ label, children, side = 'top' }: Props) {
  const sideClasses =
    side === 'top'
      ? 'bottom-full mb-2 left-1/2 -translate-x-1/2'
      : 'top-full mt-2 left-1/2 -translate-x-1/2'

  return (
    <span className="group/tooltip relative inline-flex">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute z-20 hidden w-64 rounded border border-zinc-700 bg-zinc-900 px-2.5 py-1.5 text-[11px] leading-snug text-zinc-300 shadow-lg group-hover/tooltip:block ${sideClasses}`}
      >
        {label}
      </span>
    </span>
  )
}
