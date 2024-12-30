<script setup lang="ts">
import { useLotteryDrawing } from '@/composables/useLotteryDrawing'
import { Button } from '@/components/ui/button'
import { ref, onMounted } from 'vue'
import { useFetchWinners } from '@/composables/useFetchWinners'
import { useFetchAttendants } from '@/composables/useFetchAttendants'

const { fetchWinners } = useFetchWinners()
const { pending } = useFetchAttendants()
const { consoleWinners, consolationPrizeDrawing } = useLotteryDrawing()
const drawCount = ref(6)
const drawing = async () => {
  consolationPrizeDrawing()
  drawCount.value--
  fetchWinners()
}
</script>

<template>
  <div v-if="pending" class="flex justify-center items-center mt-10">
    <p>Loading...</p>
  </div>
  <div v-else class="flex flex-col justify-center items-center mt-10 space-y-4">
    <p class="font-mono font-semibold text-2xl">Consolation Prize Drawing</p>
    <Button @click="drawing"> Draw Consolation Prize </Button>
    <div v-if="consoleWinners && consoleWinners.length > 0">
      <p class="font-mono font-semibold text-2xl text-center">Winners</p>
      <div class="flex flex-col items-center space-y-4">
        <div
          v-for="winner in consoleWinners"
          :key="winner.id"
          class="flex justify-center items-center space-x-4 text-xl"
          :class="winner.type === 'Factory' ? 'text-blue-400' : 'text-slate-500'"
        >
          <p class="font-sans font-semibold">{{ winner.code }}</p>
          <span>-</span>
          <p class="font-sans font-semibold">{{ winner.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
