interface Ingredient {
  name: string
  available: boolean
}

interface CardProductChefProps {
  image?: string | undefined
  title: string
  table: number
  plates: number
  category: string
  ingredients: Ingredient[]
  status?: 'waiting' | 'in-progress' | 'done'
}

const CardProductChef = ({
  image,
  title,
  table,
  plates,
  category,
  ingredients,
  status = 'waiting',
}: CardProductChefProps) => {
  const statusConfig = {
    waiting: { bg: 'bg-danger', label: 'Oprime Para empezar a cocinar ' },
    'in-progress': { bg: 'bg-warning', label: 'Oprime para finalizar pedido ' },
    done: { bg: 'bg-item', label: 'pedido listo para entregar por mesero' },
  }

  const { bg, label } = statusConfig[status]

  return (
    <div className='flex flex-col rounded-2xl overflow-hidden w-full'>
      {/* Left section */}
      <div className='flex flex-col flex-1 min-w-0'>
        {/* Header */}
        <div className='flex items-center gap-3 p-3 bg-card'>
          <div className='w-14 h-14 md:w-25 md:h-25 rounded-full overflow-hidden shrink-0'>
            {image ? (
              <img src={image} alt={title} className='w-full h-full object-cover' />
            ) : (
              <div className='w-full h-full bg-secondary flex items-center justify-center text-card text-xs'>
                IMG
              </div>
            )}
          </div>

          <div className='flex w-full flex-col gap-2 min-w-0'>
            <div className="flex w-full justify-between">
              <div>
                <h3 className='font-semibold text-lg uppercase leading-tight'>{title}</h3> 
              </div>
              <div>
                 <span className='bg-item text-primary text-xs font-semibold px-3 py-1 rounded-full'>
                {category}
              </span>
              </div>
              
            </div>
            
           
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                mesa<br />{table}
              </span>
              <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                platos<br />{plates}
              </span>
              <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                {/*estado*/} sin <br /> empezar
              </span>
              
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className='bg-primary p-3 grid grid-cols-2 gap-y-2 gap-x-4 h-full'>
          {ingredients.map((ingredient, index) => (
            <div key={index} className='flex items-center gap-2'>
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${ingredient.available ? 'bg-item' : 'bg-false'}`}
              />
              <span className='text-two text-sm'>{ingredient.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right status section */}
      <div className={`${bg} flex flex-col items-center justify-center w-full gap-2 shrink-0 h-16`}>
        <span className='text-white font-bold text-sm'>{label}</span>
      </div>
    </div>
  )
}

export default CardProductChef
