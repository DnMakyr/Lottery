import { useAttendantsStore } from '@/stores/attendants'
import { useWinnersStore } from '@/stores/winners'
import type { Attendant } from '@/types/attendant'
import { ref, watch, type Ref } from 'vue'
import { useSaveWinners } from './useSaveWinners'

export const useLotteryDrawing = () => {
  const pending = ref(false)
  const winnersStore = useWinnersStore()
  const attendantsStore = useAttendantsStore()
  const consoleWinners = ref<Attendant[] | null>([])
  const thirdWinners = ref<Attendant[] | null>([])
  const secondWinners = ref<Attendant[] | null>([])
  const firstWinners = ref<Attendant[] | null>([])
  const deluxeWinners = ref<Attendant[] | null>([])
  const currentWinners = ref<Attendant[] | null>([])

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
      // console.log('Current winners count:', currentWinnersCount)

      const remainingSlots = Math.max(0, maxWinners - currentWinnersCount)
      // console.log('Remaining slots:', remainingSlots)

      if (remainingSlots > 0) {
        const shuffled = shuffleArray(availableAttendants)
        const newWinners = shuffled.slice(0, Math.min(drawCount, remainingSlots))

        currentWinners.value = newWinners

        winnersStore.addWinners(newWinners)
        await useSaveWinners().saveWinners(newWinners)
        await useSaveWinners().savePrizeWinners(tier || 'winners', newWinners)
        prizeWinnersRef.value = [...(prizeWinnersRef.value || []), ...newWinners]
        // console.log('Updated prizeWinnersRef.value:', prizeWinnersRef.value)
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
    performDrawing(
      consoleWinners,
      30,
      5,
      (attendant) => attendant.type === 'Factory',
      'consolation',
    )
  const thirdPrizeDrawing = () =>
    performDrawing(thirdWinners, 15, 5, (attendant) => attendant.type === 'Office', 'third')
  const secondPrizeDrawing = () =>
    performDrawing(secondWinners, 10, 3, (attendant) => attendant.type === 'Office', 'second')
  const firstPrizeDrawing = () =>
    performDrawing(firstWinners, 2, 1, (attendant) => attendant.type === 'Office', 'first')
  const deluxePrizeDrawing = () =>
    performDrawing(deluxeWinners, 2, 1, (attendant) => attendant.type === 'Office', 'deluxe')

  return {
    pending,
    currentWinners,
    winners: {
      consoleWinners,
      thirdWinners,
      secondWinners,
      firstWinners,
      deluxeWinners,
    },
    consolationPrizeDrawing,
    thirdPrizeDrawing,
    secondPrizeDrawing,
    firstPrizeDrawing,
    deluxePrizeDrawing,
  }
}
