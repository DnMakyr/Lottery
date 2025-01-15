<template>
  <div class="text-animation flex items-center justify-center 2xl:h-[76vh] md:h-[55vh]">
    <div class="bg-white p-4 rounded-lg w-[36vw]">
      <span v-for="(char, index) in displayText" :key="index" :style="{
        animationDelay: `${index * 50}ms`,
        opacity: char === ' ' ? 1 : undefined
      }" class="inline-block">
        {{ char }}
      </span>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { useAttendantsStore } from '@/stores/attendants';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const { attendants } = useAttendantsStore()

const displayText = ref('');
let shuffleInterval: NodeJS.Timeout;

const startShuffling = () => {
  let index = 0;
  shuffleInterval = setInterval(() => {
    const attendant = attendants[index];
    displayText.value = `${attendant.code}`;
    index = (index + 1) % attendants.length; // Loop through the list
  }, 1); // Adjust interval for display duration
};

onMounted(() => {
  startShuffling();
});

onBeforeUnmount(() => {
  clearInterval(shuffleInterval);
});
</script>

<style scoped>
.text-animation {
  @apply p-4 text-2xl font-bold text-center;
}

.animate-bounce-in {
  animation: bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
  opacity: 0;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
