type FloatingMessageVariant = 'error' | 'success' | 'warning' | 'info'

import { useEffect, useState } from 'react'

type ComponentFloatingMessageProps = {
  message: string
  variant?: FloatingMessageVariant
  className?: string
  autoHideMs?: number
}

const variantClasses: Record<FloatingMessageVariant, string> = {
  error: 'bg-danger/90 text-two',
  success: 'bg-item text-primary',
  warning: 'bg-warning/90 text-primary',
  info: 'bg-primary/90 text-two',
}

const ComponentFloatingMessage = ({
  message,
  variant = 'error',
  className = '',
  autoHideMs,
}: ComponentFloatingMessageProps) => {
  const [isVisible, setIsVisible] = useState(Boolean(message))

  useEffect(() => {
    setIsVisible(Boolean(message))

    if (!autoHideMs) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setIsVisible(false)
    }, autoHideMs)

    return () => window.clearTimeout(timeoutId)
  }, [message, autoHideMs])

  if (!isVisible) {
    return null
  }

  return (
    <div
      role="alert"
      className={`absolute top-4 left-1/2 z-10 w-[90%] -translate-x-1/2 rounded-xl px-4 py-3 text-sm shadow-lg ${
        variantClasses[variant]
      } ${className}`.trim()}
    >
      {message}
    </div>
  )
}

export default ComponentFloatingMessage
