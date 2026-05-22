
import type { ComponentPropsWithoutRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label?: string
  icon?: LucideIcon
  labelClassName?: string
  activeClassName?: string
}

const ComponentInput = ({ label, icon, labelClassName, activeClassName, ...props }: InputProps) => {
  const labelClass = labelClassName?.trim() ? labelClassName : ''
  const activeClass = activeClassName?.trim()
    ? activeClassName
    : 'focus-within:ring-primary'
  const Icon = icon
  return (
    <label className="flex flex-col gap-2 text-start text-primary">
      {label ? (
        <span className={`text-sm font-semibold ${labelClass}`.trim()}>
          {label}
        </span>
      ) : null}
      <span
        className={`flex items-center gap-2 rounded-xl bg-white px-3 py-2 transition focus-within:ring-2 ${activeClass}`}
      >
        {Icon ? (
          <span className="text-primary">
            <Icon className="w-5 h-5" />
          </span>
        ) : null}
        <input
          className="w-full bg-transparent text-sm text-primary placeholder:text-secondary/80 outline-none"
          {...props}
        />
      </span>
    </label>
  )
}

export default ComponentInput