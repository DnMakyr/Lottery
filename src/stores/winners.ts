import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Attendant } from '@/types/attendant'

export const useWinnersStore = defineStore('winners', () => {
  const winners = ref<Attendant[]>([])

  /**
   * Replace the winners list with new data.
   * @param data - Array of Attendant objects
   */
  const getWinners = async (data: Attendant[]) => {
    winners.value = [...data]
  }

  /**
   * Add new winners to the list.
   * @param data - Single Attendant or an array of Attendants
   */
  const addWinners = async (data: Attendant | Attendant[]) => {
    const newWinners = Array.isArray(data) ? data : [data]

    // Debug: Log incoming data and existing winners
    console.log('New Winners:', newWinners)
    console.log('Existing Winners:', winners.value)

    // Prevent duplicates
    const uniqueWinners = newWinners.filter(
      (newWinner) => !winners.value.some((existingWinner) => existingWinner.id === newWinner.id),
    )

    // Debug: Log unique winners to be added
    console.log('Unique Winners:', uniqueWinners)

    // Update winners
    winners.value = [...winners.value, ...uniqueWinners]

    // Debug: Log final winners array
    console.log('Updated Winners:', winners.value)
  }

  return {
    winners,
    getWinners,
    addWinners,
  }
})
