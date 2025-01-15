<script setup lang="ts">
import { useLotteryDrawing } from '@/composables/useLotteryDrawing'
import { Button } from '@/components/ui/button'
import { ref, computed, useTemplateRef, nextTick, watch } from 'vue'
import { useFetchWinners } from '@/composables/useFetchWinners'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import OpaqueBox from '@/components/OpaqueBox.vue'
import TextAnimation from '@/components/TextAnimation.vue'
import music from '@/assets/audio/Nhac-Chuong-xo-so-mien-bac.mp3'

const { pendingPrize, fetchWinners } = useFetchWinners()

const { currentWinners, winners: { thirdWinners }, thirdPrizeDrawing } = useLotteryDrawing()

const drawCount = ref(0)

const drawable = computed(() => {
  // if (unref(prizeWinners).length >= 2) return false
  // if (unref(drawCount) <= 0) return false
  return true
})

const isDrawing = ref(false)

const winnerList = useTemplateRef('winner-list')

const scrollToBottom = async () => {
  await nextTick();
  if (winnerList.value) {
    winnerList.value.scrollTop = winnerList.value.scrollHeight;
  }
};

const audio = new Audio(music);
let timeoutId: NodeJS.Timeout | undefined;
const drawing = async (work: string, type: string | boolean) => {

  if (work === 'start') {
    isDrawing.value = true;
    audio.play();
    thirdPrizeDrawing(type);
    drawCount.value++;
    fetchWinners();

    timeoutId = setTimeout(async () => {
      isDrawing.value = false;
      audio.pause();
      audio.currentTime = 0
      await scrollToBottom();
    }, 10000);
  } else {
    isDrawing.value = false;
    clearTimeout(timeoutId!);
    audio.pause();
    audio.currentTime = 0
    await scrollToBottom();
  }
};


watch(thirdWinners, scrollToBottom);

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-between px-4 pt-14 pb-4">
    <div class="flex flex-col items-center space-y-6">
      <LoadingSpinner v-if="pendingPrize" />
      <div v-else class="flex flex-col items-center align-middle">
        <div class="p-4 rounded-lg w-fit" style="background-color: rgba(255, 255, 255, 0.7);">
          <p class="font-mono font-semibold uppercase text-4xl text-center text-red-800">Giải Ba</p>
        </div>
        <TextAnimation v-show="isDrawing" />
        <transition mode="out-in">
          <div v-if="!isDrawing && currentWinners && currentWinners.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-screen-lg w-full my-4">
            <OpaqueBox class="drawing-result p-6 rounded-lg space-y-4">
              <p class="font-mono font-semibold text-2xl text-center">Người Thắng Giải</p>
              <div class="flex flex-col items-center space-y-2">
                <div v-for="winner in currentWinners" :key="winner.id"
                  class="flex justify-center items-center space-x-4 text-xl">
                  <p class="font-sans font-semibold">{{ winner.code }} - {{ winner.name }} - {{ winner.dept }}</p>
                </div>
              </div>
            </OpaqueBox>
            <OpaqueBox class="winners-list flex flex-col items-center p-6 rounded-lg space-y-8">
              <p class="font-mono font-semibold text-2xl text-center">Danh Sách Người Thắng Giải</p>
              <div class="flex flex-col items-center space-y-4 2xl:h-[52vh] md:h-[36vh] overflow-auto"
                ref="winner-list">
                <div v-for="winner in thirdWinners" :key="winner.id"
                  class="flex justify-center items-center space-x-2 text-xl">
                  <p class="font-sans font-semibold">{{ winner.code }} - {{ winner.name }} - {{ winner.dept }}</p>
                </div>
              </div>
              <div v-if="thirdWinners" class="font-semibold text-xl text-center">
                <span>Tổng số: </span><span>{{ thirdWinners.length }}</span>
              </div>
            </OpaqueBox>
          </div>
        </transition>
      </div>
    </div>
    <div class="flex">
      <div v-show="!isDrawing" class="flex space-x-4 ">
        <Button class="w-32 h-32 rounded-full red-spring text-2xl font-semibold"
          @click="() => drawing('start', drawCount < 5 ? true : 'Office')">
          Bốc Giải
        </Button>
      </div>
      <div v-show="isDrawing" class="flex items-center justify-center space-x-4">
        <Button class="w-32 h-32 rounded-full red-spring text-2xl font-semibold" @click="drawing('stop', true)"
          :disabled="!drawable">
          Dừng
        </Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.v-enter-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
