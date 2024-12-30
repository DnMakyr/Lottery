import type { Attendant } from '@/types/attendant'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useAttendantsStore } from '@/stores/attendants'

export const useFetchAttendants = () => {
  const pending = ref(false)
  const attendants = ref<Attendant[]>([])

  const fetchAttendants = async () => {
    pending.value = true
    try {
      const { data, error } = await supabase.from('employees').select()
      if (!data) {
        console.error(error)
        return
      }
      attendants.value = data as Attendant[]
      useAttendantsStore().getAttendants(data as Attendant[])
    } catch (error) {
      console.error(error)
    } finally {
      pending.value = false
    }
  }
  return { all: attendants, pending, fetchAttendants }
}
