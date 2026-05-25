import { create } from 'zustand'

type IaState = {
  active: boolean
  suggestedIds: number[]
  excludedIngredientIds: number[]
  mensaje: string
  setResult: (suggestedIds: number[], excludedIngredientIds: number[], mensaje: string) => void
  clear: () => void
}

export const useIaStore = create<IaState>()((set) => ({
  active: false,
  suggestedIds: [],
  excludedIngredientIds: [],
  mensaje: '',
  setResult: (suggestedIds, excludedIngredientIds, mensaje) =>
    set({ active: true, suggestedIds, excludedIngredientIds, mensaje }),
  clear: () => set({ active: false, suggestedIds: [], excludedIngredientIds: [], mensaje: '' }),
}))
