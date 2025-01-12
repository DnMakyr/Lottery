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
      if (error) throw error

      if (data) {
        winners.value = data as Attendant[]

        const winnersStore = useWinnersStore()
        await winnersStore.getWinners(data as Attendant[])
      }
    } catch (error) {
      console.error('Error fetching winners:', error)
    } finally {
      pending.value = false
    }
  }

  const fetchPrizeWinners = async (tier: string) => {
    pendingPrize.value = true
    try {
      const { data, error } = await supabase.from(`${tier}`).select()
      if (error) throw error

      if (data) {
        prizeWinners.value = data as Attendant[]
      }
    } catch (error) {
      console.error('Error fetching prize winners:', error)
    } finally {
      pendingPrize.value = false
    }
  }

  return {
    all: winners,
    prizeWinners,
    pending,
    pendingPrize,
    fetchWinners,
    fetchPrizeWinners,
  }
}
