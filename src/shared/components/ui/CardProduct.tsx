import type { Category } from '@/shared/types/Categoy.types.ts';
import ComponentCount from '@/shared/components/overlays/ComponentCount.tsx';
import ComponentTag from '@/shared/components/overlays/ComponenTag.tsx';

export type CardProductProps ={
    name:string
    price?: number
    amount:number
    category: Category
    img: string
    type: "client"|"chef"|"waiter"

}

const CardProduct = ({ name, price, amount, category, img, type }: CardProductProps) => {
    const formattedPrice =
        typeof price === 'number' ? new Intl.NumberFormat('es-CO').format(price) : ''

 if(type==="client"){
    return(
        <div className='bg-card flex items-center px-3 py-5 w-full h-34 rounded-3xl gap-2 '>
            <div>
                <img className='w-35' src={img} alt="" />
            </div>
            <div className='flex flex-col justify-between h-full w-full'>
                <div className='font-semibold text-lg'>{name}</div>
                <div>$ {formattedPrice}</div>
                <div className='flex justify-between'>
                    <ComponentCount amount={4}/>
                    <ComponentTag text={category} />
                </div>
            </div>

        </div>
    )
 }

}

export default CardProduct