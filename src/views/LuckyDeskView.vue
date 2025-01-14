<script setup lang="ts">
import { useLotteryDrawing } from '@/composables/useLotteryDrawing'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import OpaqueBox from '@/components/OpaqueBox.vue'
import TextAnimation from '@/components/TextAnimation.vue'
import music from '@/assets/audio/Nhac-Chuong-xo-so-mien-bac.mp3'

const { randomIntDrawing } = useLotteryDrawing()

const isDrawing = ref(false)

const deskNumber = ref(0)

const audio = new Audio(music);
const drawing = async () => {
  isDrawing.value = true
  audio.play()
  deskNumber.value = randomIntDrawing(1, 13)
  setTimeout(() => {
    isDrawing.value = false
    audio.pause()

  }, 15000)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-between px-4 pt-14 pb-12">
    <div class="flex flex-col items-center space-y-6">
      <div class="flex flex-col items-center">
        <OpaqueBox :class="'bg-white p-4 rounded-lg w-fit'">
          <p class="font-mono font-semibold uppercase text-4xl text-center text-red-800">Bàn Làm Việc May Mắn</p>
        </OpaqueBox>
        <TextAnimation v-show="isDrawing" />
        <div v-if="!isDrawing && deskNumber !== 0" class="my-10">
          <OpaqueBox class="drawing-result p-6 rounded-lg space-y-4 2xl:h-[62vh] md:h-[48.5vh] ">
            <p class="font-mono font-bold text-2xl text-center text-red-800">Bàn Thắng Giải</p>
            <div class="flex flex-col items-center justify-center space-y-2 h-full">
              <span class="text-9xl font-bold">
                {{ deskNumber }}
              </span>
            </div>
          </OpaqueBox>
        </div>
      </div>
    </div>
    <Button class="w-32 h-32 rounded-full red-spring text-3xl font-semibold" @click="drawing">
      Bốc Giải
    </Button>
  </div>
</template>
