import type { ComponentPropsWithoutRef } from 'react'
import type { LucideIcon } from 'lucide-react'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  text: string
  icon?: LucideIcon
  color?: string
  loading?: boolean
}

const ComponentButton = ({ text, icon, type = 'submit', color, loading = false, ...props }: ButtonProps) => {
  const Icon = icon
  const colorClass = color?.trim() ? color : 'bg-primary'
  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`relative inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl ${colorClass} px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-primary-hover active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin w-5 h-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : null}
      <span>{text}</span>
      {Icon && !loading ? (
        <span className="absolute right-5 text-white">
          <Icon className="w-5 h-5" />
        </span>
      ) : null}
    </button>
  )
}

export default ComponentButton