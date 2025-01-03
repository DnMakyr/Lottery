import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Attendant } from '@/types/attendant'

export const useWinnersStore = defineStore('winners', () => {
  const winners = ref<Attendant[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getWinners = async (data: any) => {
    winners.value = data
  }
  const addWinners = async (data: Attendant | Attendant[]) => {
    winners.value = Array.isArray(data) ? [...winners.value, ...data] : [...winners.value, data]
  }
  return { winners, getWinners, addWinners }
})
