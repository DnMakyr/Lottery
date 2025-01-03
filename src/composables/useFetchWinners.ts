import type { Attendant } from '@/types/attendant'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useWinnersStore } from '@/stores/winners'

export const useFetchWinners = () => {
  const pending = ref(false)
  const pendingPrize = ref(false)
  const winners = ref<Attendant[]>([])
  const prizeWinners = ref<Attendant[]>([])

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
  const fetchPrizeWinners = async (tier: string) => {
    pendingPrize.value = true
    try {
      const { data, error } = await supabase.from(`${tier}`).select()
      if (!data) {
        console.error(error)
        return
      }
      prizeWinners.value = data as Attendant[]
      await useWinnersStore().getWinners(data as Attendant[])
    } catch (error) {
      console.error(error)
    } finally {
      pendingPrize.value = false
    }
  }

  return { all: winners, prizeWinners, pending, pendingPrize, fetchWinners, fetchPrizeWinners }
}
