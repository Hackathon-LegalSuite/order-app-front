import { useState, useRef, useEffect } from 'react'
import { Send, Bot } from 'lucide-react'
import { useNavigate, useParams } from 'react-router'
import { buscarPorPrompt } from '@/features/ia/services/iaService.ts'
import { useIaStore } from '@/features/ia/store/iaStore.ts'

const FormIa = () => {
  const [value, setValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { idmesa } = useParams<{ idmesa: string }>()
  const navigate = useNavigate()
  const setResult = useIaStore((s) => s.setResult)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`
    }
  }, [value])

  const submit = async () => {
    if (!value.trim() || loading) return
    setLoading(true)
    setError(null)
    try {
      const res = await buscarPorPrompt(value.trim())
      setResult(
        (res.platos ?? []).map((p) => p.id),
        (res.ingredientesExcluir ?? []).map((i) => i.id),
        res.platos && res.platos.length > 0
          ? res.mensaje
          : 'No se encontraron resultados con lo que pediste.',
      )
      navigate(`/init/${idmesa}/products`)
    } catch {
      setError('No se pudo obtener una sugerencia. Intenta de nuevo.')
      setLoading(false)
    }
  }

  const handleSubmit = (e: { preventDefault(): void }) => {
    e.preventDefault()
    submit()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 min-h-0 flex flex-col gap-5 px-2 overflow-y-auto no-scrollbar py-2">
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-item">
            <Bot className="w-8 h-8 text-primary" />
          </div>
          <div className="text-center flex flex-col gap-1">
            <h2 className="text-lg font-semibold text-primary">¿Qué se te antoja hoy?</h2>
            <p className="text-secondary text-xs leading-relaxed max-w-xs">
              Selecciona una opción o escribe tu preferencia y te proponemos el plato ideal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full pb-1">
          {[
            { emoji: '🫔', text: 'Dame empanadas' },
            { emoji: '🥤', text: 'Quiero una Malteada' },
            { emoji: '🥭', text: 'Quiero un Granizado o algo frío' },
            { emoji: '🍫', text: 'Quiero un Brownie' },
            { emoji: '🥩', text: 'Quiero algo con carne' },
            { emoji: '🧃', text: 'Quiero algo dulce' },
            { emoji: '🌶️', text: 'Dame algo con ají o salsa picante' },
            { emoji: '🎣', text: 'Dame algo con pescado' },
          ].map(({ emoji, text }) => (
            <button
              key={text}
              type="button"
              onClick={() => setValue(text)}
              className="text-left text-xs px-3 py-3 rounded-2xl bg-card border border-secondary/20 text-primary/70 transition-colors active:bg-item/10 flex items-start gap-2"
            >
              <span className="text-sm leading-none mt-px">{emoji}</span>
              <span className="leading-snug">{text}</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sticky bottom-0 pt-4 bg-page">
        {error && (
          <p className="text-xs text-danger text-center mb-3">{error}</p>
        )}
        <div className="flex items-end gap-3 bg-card rounded-2xl px-4 py-3 border border-secondary/20">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Dime lo que deseas consumir hoy..."
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-primary placeholder-secondary outline-none leading-relaxed min-h-6 max-h-35"
          />
          <button
            type="submit"
            disabled={!value.trim() || loading}
            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-white transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormIa
