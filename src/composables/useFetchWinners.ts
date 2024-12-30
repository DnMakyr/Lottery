import type { Attendant } from '@/types/attendant'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useWinnersStore } from '@/stores/winners'

export const useFetchWinners = () => {
  const pending = ref(false)
  const winners = ref<Attendant[]>([])

  const fetchWinners = async () => {
    pending.value = true
    try {
      const { data, error } = await supabase.from('winners').select()
      if (!data) {
        console.error(error)
        return
      }
      winners.value = data as Attendant[]
      useWinnersStore().getWinners(data as Attendant[])
    } catch (error) {
      console.error(error)
    } finally {
      pending.value = false
    }
  }
  const saveWinners = async (data: Attendant[] | Attendant) => {
    try {
      const { error } = await supabase.from('winners').upsert(data)
      if (error) {
        console.error(error)
        return
      }
      winners.value = Array.isArray(data) ? data : [data]
      useWinnersStore().getWinners(data as Attendant[])
    } catch (error) {
      console.error(error)
    }
  }
  return { all: winners, pending, fetchWinners, saveWinners }
}
