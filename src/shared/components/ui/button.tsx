import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  text: string
  icon?: ReactNode
  color?: string
}

const Button = ({ text, icon, type = 'submit', color, ...props }: ButtonProps) => {
  const colorClass = color?.trim() ? color : 'bg-primary'
  return (
    <button
      type={type}
      className={`relative inline-flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl ${colorClass} px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover active:translate-y-px`}
      {...props}
    >
      <span>{text}</span>
      {icon ? <span className="absolute right-5 text-white">{icon}</span> : null}
    </button>
  )
}

export default Button