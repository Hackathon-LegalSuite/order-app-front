import type { ReactNode } from "react"

type ClientLayoutProps = {
  children: ReactNode
  maxWidthClassName?: string
  contentClassName?: string
}

const ClientLayout = ({
  children,
  maxWidthClassName = "max-w-4xl",
  contentClassName = "",
}: ClientLayoutProps) => {
  return (
    <div className="w-full h-screen flex flex-col items-center bg-item">
      <div
        className={`flex flex-col w-full ${maxWidthClassName} bg-background h-screen py-8 px-6 ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  )
}

export default ClientLayout
