import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Attendant } from '@/types/attendant'

export const useAttendantsStore = defineStore('attendants', () => {
  const attendants = ref<Attendant[]>([])
  const total = computed(() => attendants.value.length)
  const getAttendants = async (data: Attendant[]) => {
    attendants.value = data
  }

  return { attendants, total, getAttendants }
})
