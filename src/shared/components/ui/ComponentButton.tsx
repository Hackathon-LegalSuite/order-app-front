import type { ComponentPropsWithoutRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  text: string
  icon?: LucideIcon
  color?: string
}

const ComponentButton = ({ text, icon, type = 'submit', color, ...props }: ButtonProps) => {
  const Icon = icon
  const colorClass = color?.trim() ? color : 'bg-primary'
  return (
    <button
      type={type}
      className={`relative inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl ${colorClass} px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover active:translate-y-px`}
      {...props}
    >
      <span>{text}</span>
      {Icon ? (
        <span className="absolute right-5 text-white">
          <Icon className="w-5 h-5" />
        </span>
      ) : null}
    </button>
  )
}

export default ComponentButton