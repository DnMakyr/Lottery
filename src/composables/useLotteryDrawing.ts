import { useAttendantsStore } from '@/stores/attendants'
import { useWinnersStore } from '@/stores/winners'
import type { Attendant } from '@/types/attendant'
import { ref, watch, type Ref } from 'vue'
import { useFetchWinners } from './useFetchWinners'

export const useLotteryDrawing = () => {
  const pending = ref(false)
  const winnersStore = useWinnersStore()
  const attendantsStore = useAttendantsStore()
  const consoleWinners = ref<Attendant[] | null>([])
  const thirdWinners = ref<Attendant[] | null>([])
  const secondWinners = ref<Attendant[] | null>([])
  const firstWinners = ref<Attendant[] | null>([])
  const deluxeWinners = ref<Attendant[] | null>([])
  const turnWinners = ref<Attendant[] | null>([])

  watch(consoleWinners, () => {
    if (consoleWinners.value && consoleWinners.value.length >= 30) {
      confirm('Congratulations to all the consolation prize winners!')
      return
    }
  })
  const shuffleArray = (array: Attendant[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))
      const temp = array[i]
      array[i] = array[randomIndex]
      array[randomIndex] = temp
    }
    return array
  }

  const performDrawing = async (
    prizeWinnersRef: Ref<Attendant[] | null>,
    maxWinners: number,
    drawCount: number,
    filterFn?: (attendant: Attendant) => boolean,
    tier?: string,
  ) => {
    pending.value = true
    try {
      const attendants = attendantsStore.attendants

      if (!attendants.length) {
        alert('No attendants available for the draw.')
        return
      }

      let availableAttendants = attendants.filter(
        (attendant) =>
          !winnersStore.winners.some((winner: Attendant) => winner.id === attendant.id),
      )

      if (filterFn) {
        availableAttendants = availableAttendants.filter(filterFn)
      }

      if (!availableAttendants.length) {
        alert('No eligible attendants available for the draw.')
        return
      }

      const currentWinnersCount = prizeWinnersRef.value?.length || 0
      console.log('Current winners count:', currentWinnersCount)

      const remainingSlots = Math.max(0, maxWinners - currentWinnersCount)
      console.log('Remaining slots:', remainingSlots)

      if (remainingSlots > 0) {
        const shuffled = shuffleArray(availableAttendants)
        const newWinners = shuffled.slice(0, Math.min(drawCount, remainingSlots))

        console.log('New winners to add:', newWinners)

        winnersStore.addWinners(newWinners)
        await useFetchWinners().saveWinners(newWinners)

        prizeWinnersRef.value = [...(prizeWinnersRef.value || []), ...newWinners]
        console.log('Updated prizeWinnersRef.value:', prizeWinnersRef.value)
      } else {
        alert('All winners have been drawn.')
      }
    } catch (error) {
      console.error('An error occurred during the drawing:', error)
      alert('An error occurred. Please try again.')
    } finally {
      pending.value = false
    }
  }

  const consolationPrizeDrawing = () =>
    performDrawing(consoleWinners, 30, 5, (attendant) => attendant.type === 'Factory')
  const thirdPrizeDrawing = () =>
    performDrawing(thirdWinners, 15, 5, (attendant) => attendant.type === 'Office')
  const secondPrizeDrawing = () =>
    performDrawing(secondWinners, 10, 3, (attendant) => attendant.type === 'Office')
  const firstPrizeDrawing = () =>
    performDrawing(firstWinners, 5, 2, (attendant) => attendant.type === 'Office')
  const deluxePrizeDrawing = () =>
    performDrawing(deluxeWinners, 2, 1, (attendant) => attendant.type === 'Office')

  return {
    pending,
    consoleWinners,
    thirdWinners,
    secondWinners,
    firstWinners,
    deluxeWinners,
    consolationPrizeDrawing,
    thirdPrizeDrawing,
    secondPrizeDrawing,
    firstPrizeDrawing,
    deluxePrizeDrawing,
  }
}
