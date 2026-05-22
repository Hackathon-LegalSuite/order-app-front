
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string
  icon?: ReactNode
  labelClassName?: string
  activeClassName?: string
}

const ComponentInput = ({ label, icon, labelClassName, activeClassName, ...props }: InputProps) => {
  const labelClass = labelClassName?.trim() ? labelClassName : ''
  const activeClass = activeClassName?.trim()
    ? activeClassName
    : 'focus-within:ring-primary'
  return (
    <label className="flex flex-col gap-2 text-start text-primary">
      {label ? (
        <span className={`text-sm font-semibold ${labelClass}`.trim()}>
          {label}
        </span>
      ) : null}
      <span
        className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-black/5 transition focus-within:ring-2 ${activeClass}`}
      >
        {icon ? <span className="text-primary">{icon}</span> : null}
        <input
          className="w-full bg-transparent text-sm text-primary placeholder:text-secondary/80 outline-none"
          {...props}
        />
      </span>
    </label>
  )
}

export default ComponentInput