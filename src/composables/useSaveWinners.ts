import type { Attendant } from '@/types/attendant'
import { supabase } from '@/lib/supabaseClient'

export const useSaveWinners = () => {
  const saveWinners = async (data: Attendant[] | Attendant) => {
    try {
      const { error } = await supabase.from('winners').upsert(data)
      if (error) {
        console.error(error)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }
  const savePrizeWinners = async (tier: string, data: Attendant[] | Attendant) => {
    try {
      const { error } = await supabase.from(`${tier}`).upsert(data)
      if (error) {
        console.error(error)
        return
      }
    } catch (error) {
      console.error(error)
    }
  }
  return { saveWinners, savePrizeWinners }
}
