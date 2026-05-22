import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

type CartItem = {
  id: string
  productId: number
  excludedIngredientIds: number[]
  createdAt: number
}

type CartState = {
  items: CartItem[]
  addItem: (productId: number, excludedIngredientIds?: number[]) => void
  removeItem: (id: string) => void
  removeLastItemByProduct: (productId: number) => void
  updateItemExclusions: (id: string, excludedIngredientIds: number[]) => void
  clearCart: () => void
}

const normalizeExcluded = (ids: number[] = []) =>
  Array.from(new Set(ids)).sort((a, b) => a - b)

const createCartItemId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (productId, excludedIngredientIds) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              id: createCartItemId(),
              productId,
              excludedIngredientIds: normalizeExcluded(excludedIngredientIds),
              createdAt: Date.now(),
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      removeLastItemByProduct: (productId) =>
        set((state) => {
          const reversedIndex = [...state.items]
            .reverse()
            .findIndex((item) => item.productId === productId)

          if (reversedIndex === -1) {
            return state
          }

          const removeIndex = state.items.length - 1 - reversedIndex
          return {
            items: state.items.filter((_, index) => index !== removeIndex),
          }
        }),
      updateItemExclusions: (id, excludedIngredientIds) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, excludedIngredientIds: normalizeExcluded(excludedIngredientIds) }
              : item,
          ),
        })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'order-app-cart',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export const selectCartCount = (state: CartState) => state.items.length

export const selectProductCount = (productId: number) => (state: CartState) =>
  state.items.filter((item) => item.productId === productId).length

export type { CartItem, CartState }
