import { http } from '@/services/http.ts'
import type { IaRequest, IaResponse } from '@/features/ia/types/ia.types.ts'

export const buscarPorPrompt = async (prompt: string): Promise<IaResponse> => {
  const body: IaRequest = { prompt }
  const { data } = await http.post<IaResponse>('/menu/buscar', body)
  return data
}
