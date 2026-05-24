type ComponentTagProps = {
  text: string
}

const ComponentTag = ({ text }: ComponentTagProps) => {
  return (
    <div className="bg-item flex px-3 py-1 items-center justify-center font-normal rounded-2xl ">
      <span className="text-xs font-normal text-two">{text}</span>
    </div>
  )
}

export default ComponentTag
