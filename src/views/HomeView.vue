<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAttendantsStore } from '@/stores/attendants'
import { Button } from '@/components/ui/button'
import type { Attendant } from '@/types/attendant'
import { useFetchAttendants } from '@/composables/useFetchAttendants'
import OpaqueBox from '@/components/OpaqueBox.vue'

const router = useRouter()

const attendants = ref<Attendant[]>([])

onMounted(async () => {
  try {
    const attendantsStore = useAttendantsStore()
    if (!attendantsStore.attendants.length) {
      await useFetchAttendants().fetchAttendants()
    }
    attendants.value = attendantsStore.attendants
  } catch (error) {
    console.error('Failed to load attendants:', error)
  }
})
</script>

<template>
  <div class="flex flex-col justify-center items-center">
    <OpaqueBox :class="'mt-56 bg-white p-4 rounded-lg'">
      <h1 class="text-6xl font-bold uppercase text-red-spring">
        Mừng Xuân Bốc Thăm Trúng Thưởng
      </h1>
    </OpaqueBox>
    <div class="flex flex-col justify-center items-center mt-10">
      <div class="space-x-4 flex justify-center items-center">
        <Button @click="router.push('/consolation')" class="red-spring">Giải Khuyến Khích</Button>
        <Button @click="router.push('/third')" class="red-spring">Giải Ba</Button>
        <Button @click="router.push('/second')" class="red-spring">Giải Nhì</Button>
        <Button @click="router.push('/first')" class="red-spring">Giải Nhất</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.red-spring {
  background-color: #A31D1D;
}

.text-red-spring {
  color: #A31D1D;
}
</style>
