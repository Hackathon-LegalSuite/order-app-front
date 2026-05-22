import { useParams } from 'react-router'
import Initform from './InitForm.tsx'

const InitProducts = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  console.log('ID da mesa:', idmesa)

  return( <div className="w-full h-screen flex items-center justify-center bg-item px-6 py-9">
    <Initform />

  </div>)
}

export default InitProducts