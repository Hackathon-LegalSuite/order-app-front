import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import ClientLayout from '@/shared/components/layouts/ClientLayout.tsx'
import FormIa from './FormIa.tsx'

const PageIa = () => {
  const { idmesa } = useParams<{ idmesa: string }>()
  const navigate = useNavigate()

  return (
    <ClientLayout>
      <header className="flex items-center gap-3 mb-6">
        <button
          type="button"
          onClick={() => navigate(`/init/${idmesa}/products`)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-card text-primary active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <span className="text-2xl font-semibold text-primary leading-tight">Sugerencia IA</span>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex flex-col">
        <FormIa />
      </main>
    </ClientLayout>
  )
}

export default PageIa
