<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAttendantsStore } from '@/stores/attendants'
import { columns } from '@/components/employee/columns'
import DataTable from '@/components/DataTable.vue'
import { Button } from '@/components/ui/button'
import type { Attendant } from '@/types/attendant'
import { useFetchAttendants } from '@/composables/useFetchAttendants'
import OpaqueBox from '@/components/OpaqueBox.vue'

const router = useRouter()
const showTable = ref(false)

const toggleTable = () => {
  showTable.value = !showTable.value
}

const buttonLabel = computed(() => (showTable.value ? 'Ẩn' : 'Hiện') + " Danh Sách Người Tham Gia")

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
        <Button @click="router.push('/consolation')" class="red-spring">Bốc Giải Khuyến Khích</Button>
        <Button @click="router.push('/third')" class="red-spring">Bốc Giải Ba</Button>
        <Button @click="router.push('/second')" class="red-spring">Bốc Giải Nhì</Button>
        <Button @click="router.push('/first')" class="red-spring">Bốc Giải Nhất</Button>
        <Button @click="router.push('/deluxe')" class="red-spring">Bốc Giải Đặc Biệt</Button>
      </div>
      <Button class="my-5" @click="toggleTable">{{ buttonLabel }}</Button>
      <DataTable v-show="showTable" :columns="columns" :data="attendants" />
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
