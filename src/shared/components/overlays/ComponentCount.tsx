import { Minus, Plus } from 'lucide-react'

type ComponentCountProps = {
  amount: number
  onIncrement?: () => void
  onDecrement?: () => void
}

const ComponentCount = ({ amount, onIncrement, onDecrement }: ComponentCountProps) => {
  return (
    <div className="bg-primary flex justify-between items-center w-18 px-1 py-1 rounded-3xl">
      <div
        onClick={onDecrement}
        className='bg-two rounded-full h-5 w-5 flex justify-center items-center cursor-pointer transition hover:brightness-90 hover:scale-105 active:scale-95 active:translate-y-px'
      >
        <Minus className='w-4 h-4' />
      </div>
      <div className='text-two font-light text-sm leading-none'>
        {amount}
      </div>
      <div
        onClick={onIncrement}
        className='bg-two rounded-full h-5 w-5 flex justify-center items-center cursor-pointer transition hover:brightness-90 hover:scale-105 active:scale-95 active:translate-y-px'
      >
        <Plus className='w-4 h-4' />
      </div>
    </div>
  )
}

export default ComponentCount
