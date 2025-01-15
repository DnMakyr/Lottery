import { useAttendantsStore } from '@/stores/attendants'
import { useWinnersStore } from '@/stores/winners'
import type { Attendant } from '@/types/attendant'
import { ref, type Ref } from 'vue'
import { useSaveWinners } from './useSaveWinners'
import { storeToRefs } from 'pinia'

export const useLotteryDrawing = () => {
  const pending = ref(false)
  const winnersStore = useWinnersStore()
  const { winners } = storeToRefs(winnersStore)
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
    filterFn?: (attendant: Attendant) => boolean | undefined,
    tier?: string,
  ) => {
    try {
      pending.value = true

      const attendants = attendantsStore.attendants
      if (!attendants.length) throw new Error('No attendants available for the draw.')

      let availableAttendants = attendants.filter(
        (attendant) => !winners.value.some((winner: Attendant) => winner.id === attendant.id),
      )

      if (filterFn) availableAttendants = availableAttendants.filter(filterFn)

      if (!availableAttendants.length)
        throw new Error('No eligible attendants available for the draw.')

      const currentWinnersCount = prizeWinnersRef.value?.length || 0
      const remainingSlots = Math.max(0, maxWinners - currentWinnersCount)

      if (tier === 'consolation' && remainingSlots <= 0)
        throw new Error('All winners have been drawn.')

      const shuffled = shuffleArray(availableAttendants)

      const newWinners =
        tier === 'consolation'
          ? shuffled.slice(0, Math.min(drawCount, remainingSlots))
          : shuffled.slice(0, drawCount)

      currentWinners.value = newWinners

      // winnersStore.addWinners(newWinners)
      await Promise.all([
        useSaveWinners().saveWinners(newWinners),
        useSaveWinners().savePrizeWinners(tier || 'winners', newWinners),
      ])

      prizeWinnersRef.value = [...(prizeWinnersRef.value || []), ...newWinners]
    } catch (error) {
      console.error('Error during the draw:', error)
      if (error instanceof Error) {
        alert(error.message || 'An error occurred. Please try again.')
      } else {
        alert('An error occurred. Please try again.')
      }
    } finally {
      pending.value = false
    }
  }

  const consolationPrizeDrawing = () =>
    performDrawing(consoleWinners, 30, 10, () => true, 'consolation')
  const thirdPrizeDrawing = (type: string) =>
    performDrawing(thirdWinners, 15, 1, (attendant) => attendant.type === type, 'third')
  const secondPrizeDrawing = () =>
    performDrawing(secondWinners, 10, 1, (attendant) => attendant.type === 'office', 'second')
  const firstPrizeDrawing = () =>
    performDrawing(firstWinners, 2, 1, (attendant) => attendant.type === 'office', 'first')
  const deluxePrizeDrawing = () =>
    performDrawing(deluxeWinners, 2, 1, (attendant) => attendant.type === 'office', 'deluxe')

  const randomIntDrawing = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
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
    randomIntDrawing,
  }
}
