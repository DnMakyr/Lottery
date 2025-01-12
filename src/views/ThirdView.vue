<script setup lang="ts">
import { useLotteryDrawing } from '@/composables/useLotteryDrawing'
import { Button } from '@/components/ui/button'
import { ref, onMounted, unref, computed } from 'vue'
import { useFetchWinners } from '@/composables/useFetchWinners'
import LoadingSpinner from '@/components/LoadingSpinner.vue'

const { pendingPrize, prizeWinners, fetchWinners, fetchPrizeWinners } = useFetchWinners()

const { currentWinners, thirdPrizeDrawing } = useLotteryDrawing()
const drawCount = ref(3)
const drawing = async () => {
  thirdPrizeDrawing()
  drawCount.value--
  fetchWinners()
}

const drawable = computed(() => {
  if (unref(prizeWinners).length >= 15) return false
  if (unref(drawCount) <= 0) return false
  return true
})
onMounted(async () => {
  fetchPrizeWinners('third')
})
</script>

<template>
  <LoadingSpinner v-if="pendingPrize" />
  <div v-else class="pt-36 flex flex-col justify-center items-center align-middle space-y-4">
    <p class="font-mono font-semibold text-2xl">Bốc Giải Ba</p>
    <Button @click="drawing" :disabled="!drawable">Bốc Giải</Button>
    <div v-if="currentWinners && currentWinners.length > 0">
      <p class="font-mono font-semibold text-2xl text-center">Người Thắng Giải</p>
      <div class="flex flex-col items-center space-y-4">
        <div v-for="winner in currentWinners" :key="winner.id"
          class="flex justify-center items-center space-x-4 text-xl"
          :class="winner.type === 'Factory' ? 'text-blue-400' : 'text-slate-500'">
          <p class="font-sans font-semibold">{{ winner.code }}</p>
          <span>-</span>
          <p class="font-sans font-semibold">{{ winner.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
