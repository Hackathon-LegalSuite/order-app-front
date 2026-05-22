import type { Category } from '@/shared/types/Categoy.types.ts';
import ComponentCount from '@/shared/components/overlays/ComponentCount.tsx';
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx';
import { SquarePen, Check  } from 'lucide-react';
import { useState } from 'react';

export type CardProductProps ={
    name:string
    price?: number
    amount:number
    category: Category
    img: string
    ingredients: Array<{ id: number; label: string }>
    type: "client"|"chef"|"waiter"

}

const CardProduct = ({ name, price, amount, category, img, ingredients, type }: CardProductProps) => {
    const [isSelected, setIsSelected] = useState(false)
    const formattedPrice =
        typeof price === 'number' ? new Intl.NumberFormat('es-CO').format(price) : ''

 if(type==="client"){
    return(
        <div className={`flex px-3 py-5 w-full h-36 rounded-3xl gap-2 ${isSelected ? 'bg-primary items-start' : 'bg-card items-center'}`}>
            {isSelected ? (
                <div className='flex flex-col gap-3 w-full h-full text-two'>
                    <div className='flex justify-between h-full gap-3 w-full'>
                        <div className='grid grid-rows-4 grid-flow-col gap-x-6 gap-y-3 text-sm flex-1 w-full content-start'>
                        {ingredients.map((ingredient) => (
                            <div key={ingredient.id} className='flex items-center gap-2'>
                                <span className='w-2 h-2 rounded-full bg-item'></span>
                                <span>{ingredient.label}</span>
                            </div>
                        ))}
                    </div>
                        <button
                            type="button"
                            onClick={() => setIsSelected((value) => !value)}
                            className='bg-two w-11 h-7 flex items-center justify-center py-2 px-2 rounded-2xl'
                        >
                            <Check className='text-one w-4 h-4' />
                        </button>
                    </div>
                    
                </div>
            ) : (
                <>
                    <div>
                        <img className='w-35' src={img} alt="" />
                    </div>
                    <div className='flex flex-col justify-between h-full w-full'>
                        <div className='flex justify-between gap-1'>
                            <div className='font-semibold text-lg leading-tight'>{name}</div>
                            <button
                                type="button"
                                onClick={() => setIsSelected((value) => !value)}
                                className='bg-one w-12 h-8 flex items-center justify-center py-2 px-2 rounded-2xl'
                            >
                                <SquarePen className='text-two w-4 h-4' />
                            </button>
                        </div>
                        <div>$ {formattedPrice}</div>
                        <div className='flex justify-between'>
                            <ComponentCount amount={amount}/>
                            <ComponentTag text={category} />
                        </div>
                    </div>
                </>
            )}

        </div>
    )
 }

 return null
}

export default CardProduct