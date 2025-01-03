<script setup lang="ts">
import { RouterView } from 'vue-router'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import { ref, onMounted } from 'vue'
import { useFetchAttendants } from '@/composables/useFetchAttendants'
import { useFetchWinners } from '@/composables/useFetchWinners'

const isLoading = ref(true)
const error = ref<string | null>(null)

const { fetchAttendants } = useFetchAttendants()
const { fetchWinners } = useFetchWinners()

onMounted(async () => {
  try {
    await Promise.all([fetchAttendants(), fetchWinners()])
  } catch (err) {
    error.value = `Error fetching data: ${err instanceof Error ? err.message : String(err)}`
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <LoadingSpinner v-if="isLoading" />
    <div v-else-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>
    <DefaultLayout v-else>
      <RouterView />
    </DefaultLayout>
  </div>
</template>
