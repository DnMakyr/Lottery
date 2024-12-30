<script setup lang="ts">
import { ref } from 'vue'
import { useFetchAttendants } from '@/composables/useFetchAttendants'
import { onMounted } from 'vue'
import { columns } from '@/components/employee/columns'
import DataTable from '@/components/DataTable.vue'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { useRouter } from 'vue-router'
import { useFetchWinners } from '../composables/useFetchWinners'

const router = useRouter()
const { all: attendants, pending, fetchAttendants } = useFetchAttendants()
const { all: winners, fetchWinners } = useFetchWinners()
const showTable = ref(false)

const toggleTable = () => {
  showTable.value = !showTable.value
}
</script>

<template>
  <LoadingSpinner v-if="pending" />
  <div v-else class="flex flex-col justify-center items-center mt-10">
    <h1 class="font-mono text-4xl font-bold uppercase">Lottery Drawing App</h1>
    <div class="flex flex-col justify-center items-center mt-10">
      <div class="space-x-4 flex justify-center items-center">
        <Button @click="router.push('/consolation')"> Draw Consolation Prize </Button>
        <Button @click="router.push('/third')"> Draw Third Prize </Button>
        <Button @click="router.push('/second')"> Draw Second Prize </Button>
        <Button @click="router.push('/first')"> Draw First Prize </Button>
        <Button @click="router.push('/deluxe')"> Draw Deluxe Prize </Button>
      </div>
      <Button class="my-5" @click="toggleTable">
        {{ showTable ? 'Hide' : 'Show' }} Attendants' List
      </Button>
      <DataTable v-show="showTable" :columns="columns" :data="attendants" />
    </div>
  </div>
</template>
