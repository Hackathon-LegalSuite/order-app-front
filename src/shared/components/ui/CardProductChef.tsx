import './CardProductChef.css'

interface Ingredient {
  name: string
  available: boolean
}

interface CardProductChefProps {
  image?: string | undefined
  title: string
  table: number
  mesero?: string
  plates?: number
  ingredients: Ingredient[]
  status?: 'waiting' | 'in-progress' | 'ready' | 'done'
  loading?: boolean
  flashing?: boolean
  onStatusChange?: () => void
}

const CardProductChef = ({
  image,
  title,
  table,
  mesero,
  plates,
  ingredients,
  status = 'waiting',
  loading = false,
  flashing = false,
  onStatusChange,
}: CardProductChefProps) => {
  const statusConfig = {
    waiting:      { bg: 'bg-danger',  label: 'Empezar a cocinar' },
    'in-progress': { bg: 'bg-warning', label: 'Marcar como listo' },
    ready:        { bg: 'bg-danger',   label: 'Marcar como entregado' },
    done:         { bg: 'bg-success',  label: 'Entregado' },
  }

  const { bg, label } = statusConfig[status]

  return (
    <div className='relative flex flex-col rounded-2xl overflow-hidden w-full'>
      {flashing && (
        <div className='animate-flash-success absolute inset-0 bg-success rounded-2xl pointer-events-none z-10' />
      )}
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

              </div>
              
            </div>
            
           
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                mesa<br />{table}
              </span>
              {plates !== undefined && (
                <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                  platos<br />{plates}
                </span>
              )}
              {mesero && (
                <span className='bg-primary text-card text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight'>
                  mesero<br />{mesero}
                </span>
              )}
              <span className={`text-xs font-semibold px-3 py-1 rounded-lg text-center leading-tight ${
                status === 'waiting' ? 'bg-danger text-white' :
                status === 'in-progress' ? 'bg-warning text-primary' :
                'bg-item text-primary'
              }`}>
                {status === 'waiting' ? 'Sin empezar' :
                 status === 'in-progress' ? 'Cocinándose' :
                 status === 'ready' ? 'Listo para entregar' :
                 'Entregado'}
              </span>
              
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className='bg-primary p-3 grid grid-cols-2 gap-y-2 gap-x-4 h-full'>
          {ingredients.map((ingredient, index) => (
            <div key={index} className='flex items-center gap-2'>
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${ingredient.available ? 'bg-item' : 'bg-secondary'}`}
              />
              <span className={`text-two text-sm ${ingredient.available ? '' : 'line-through opacity-60'}`}>
                {ingredient.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onStatusChange}
        disabled={loading || status === 'done'}
        className={`${bg} flex items-center justify-center w-full gap-2 shrink-0 h-16 transition-opacity ${loading || status === 'done' ? 'opacity-60 cursor-default' : 'cursor-pointer'}`}
      >
        <span className='text-white font-bold text-sm'>
          {loading ? 'Actualizando...' : label}
        </span>
      </button>
    </div>
  )
}

export default CardProductChef
