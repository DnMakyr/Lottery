<script setup lang="ts">
import AppHeader from './AppHeader.vue';
import backgroundImage from '../../assets/background/job516-namcha-09.jpg';
</script>

<template>
  <div>
    <AppHeader />
    <main class="min-h-screen w-full bg-cover" :style="{ backgroundImage: `url('${backgroundImage}')` }">
      <slot />
    </main>
  </div>
</template>

<style>
.red-spring {
  background-color: #A31D1D;
}

.text-red-spring {
  color: #A31D1D;
}
</style>
